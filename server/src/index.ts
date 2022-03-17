import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import env from './envLoader'
import { DBField, readDB } from './dbController'
;(async () => {
  const clientUrl = env.CLIENT_URL as string
  const port = env.PORT || 8000

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART),
      },
    },
  })

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: [clientUrl, 'https://studio.apollographql.com'],
      credentials: true,
    },
  })
  await app.listen({ port })

  console.log(`server listening on ${port}...`)
})()
