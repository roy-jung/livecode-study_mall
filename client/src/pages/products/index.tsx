import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductList from '../../components/product/list'
import GET_PRODUCTS, { Products } from '../../graphql/products'
import useIntersection from '../../hooks/useIntersection'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

const ProductListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useIntersection(fetchMoreRef)

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      QueryKeys.PRODUCTS,
      ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: lastPage => {
          return lastPage.products.at(-1)?.id
        },
      },
    )

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }, [intersecting])

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </div>
  )
}

export default ProductListPage
