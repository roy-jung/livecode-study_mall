import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { checkedCartState } from '../../recoils/cart'
import ItemData from '../cart/itemData'

const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string
  handleSubmit: (e: SyntheticEvent) => void
}) => {
  const checkedItems = useRecoilValue(checkedCartState)
  const totalPrice = checkedItems.reduce((res, { price, amount }) => {
    res += price * amount
    return res
  }, 0)

  return (
    <div className="cart-willpay">
      <ul>
        {checkedItems.map(({ imageUrl, price, title, amount, id }) => (
          <li key={id}>
            <ItemData imageUrl={imageUrl} price={price} title={title} />
            <p>수량: {amount}</p>
            <p>금액: {price * amount}</p>
          </li>
        ))}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  )
}

export default WillPay
