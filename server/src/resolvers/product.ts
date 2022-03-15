import { Resolver } from './types'

const productResolver: Resolver = {
  Query: {
    products: (parent, args, { db }) => {
      return db.products
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find(item => item.id === id)
      if (found) return found
      return null
    },
  },
}

export default productResolver
