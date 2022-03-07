import { QueryClient } from 'react-query'

// import { getTodos, postTodo } from '../my-api'

type AnyOBJ = { [key: string]: any }

export const getClient = (() => {
  let client: QueryClient | null = null
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
    return client
  }
})()

const BASE_URL = 'https://fakestoreapi.com'

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  body?: AnyOBJ
  params?: AnyOBJ
}) => {
  try {
    let url = `${BASE_URL}${path}`
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      },
    }
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += '?' + searchParams.toString()
    }
    if (body) fetchOptions.body = JSON.stringify(body)

    const res = await fetch(url, fetchOptions)
    const json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
}
