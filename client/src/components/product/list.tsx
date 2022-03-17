import { Product } from '../../graphql/products'
import ProductItem from './item'

const ProductList = ({
  list,
}: {
  list: {
    products: Product[]
  }[]
}) => (
  <ul className="products">
    {list.map(page => page.products.map(product => <ProductItem {...product} key={product.id} />))}
  </ul>
)

export default ProductList
