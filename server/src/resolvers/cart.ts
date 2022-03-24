import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Product, Resolver } from './types'

const cartResolver: Resolver = {
  Query: {
    cart: async (parent, args) => {
      const cart = collection(db, 'cart')
      const cartSnap = await getDocs(cart)
      const data: DocumentData[] = []
      cartSnap.forEach(doc => {
        const d = doc.data()
        data.push({
          id: doc.id,
          ...d,
        })
      })
      return data
    },
  },
  Mutation: {
    addCart: async (parent, { productId }) => {
      if (!productId) throw Error('상품id가 없다!')
      const productRef = doc(db, 'products', productId)
      const cartCollection = collection(db, 'cart')
      const exist = (await getDocs(query(cartCollection, where('product', '==', productRef))))
        .docs[0]

      let cartRef
      if (exist) {
        cartRef = doc(db, 'cart', exist.id)
        await updateDoc(cartRef, {
          amount: increment(1),
        })
      } else {
        cartRef = await addDoc(cartCollection, {
          amount: 1,
          product: productRef,
        })
      }
      const cartSnapshot = await getDoc(cartRef)
      return {
        ...cartSnapshot.data(),
        product: productRef,
        id: cartSnapshot.id,
      }
    },
    updateCart: async (parent, { cartId, amount }) => {
      if (amount < 1) throw Error('1 이하로 바꿀 수 없습니다.')
      const cartRef = doc(db, 'cart', cartId)
      if (!cartRef) throw Error('장바구니 정보가 없다')
      await updateDoc(cartRef, {
        amount,
      })
      const cartSnapshot = await getDoc(cartRef)
      return {
        ...cartSnapshot.data(),
        id: cartSnapshot.id,
      }
    },

    deleteCart: async (parent, { cartId }) => {
      const cartRef = doc(db, 'cart', cartId)
      if (!cartRef) throw Error('장바구니 정보가 없다')
      await deleteDoc(cartRef)
      return cartId
    },

    executePay: async (parent, { ids }) => {
      // createdAt이 비어있지 않은 ids들에 대해서 결제처리가 완료되었다고 가정하고
      // cart에서 이들 ids를 지워준다.
      const deleted = []
      for await (const id of ids) {
        const cartRef = doc(db, 'cart', id)
        const cartSnapshot = await getDoc(cartRef)
        const cartData = cartSnapshot.data()
        const productRef = cartData?.product
        if (!productRef) throw Error('상품정보가 없다.')
        const product = (await getDoc(productRef)).data() as Product
        if (product.createdAt) {
          await deleteDoc(cartRef)
          deleted.push(id)
        } else {
        }
      }
      return deleted
    },
  },
  CartItem: {
    product: async (cartItem, args) => {
      const product = await getDoc(cartItem.product)
      const data = product.data() as any
      return {
        ...data,
        id: product.id,
      }
    },
  },
}

export default cartResolver
