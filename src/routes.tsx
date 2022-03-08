import GlobalLayout from './pages/_layout'
import Index from './pages/index'
import CartIndex from './pages/cart/index'
import PaymentIndex from './pages/payment/index'
import ProductsIndex from './pages/products/index'
import ProductsId from './pages/products/[id]'

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/cart', element: <CartIndex />, index: true },
      { path: '/payment', element: <PaymentIndex />, index: true },
      { path: '/products', element: <ProductsIndex />, index: true },
      { path: '/products/:id', element: <ProductsId /> },
    ],
  },
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/payment' },
  { route: '/products' },
  { route: '/products/:id' },
]
