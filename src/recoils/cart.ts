import { atom, selector, selectorFamily, useRecoilValue } from 'recoil'

const cartState = atom<Map<string, number>>({
  key: 'cartState',
  default: new Map(),
})

export const cartItemSelector = selectorFamily<number | undefined, string>({
  key: 'cartItem',
  get:
    (id: string) =>
    ({ get }) => {
      const carts = get(cartState)
      return carts.get(id)
    },
  set:
    (id: string) =>
    ({ get, set }, newValue) => {
      if (typeof newValue === 'number') {
        const newCart = new Map([...get(cartState)])
        newCart.set(id, newValue)
        console.log(newCart)
        set(cartState, newCart)
      }
    },
})
