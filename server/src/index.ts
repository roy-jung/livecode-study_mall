import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import { DBField, readDB } from './dbController'
;(async () => {
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
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  })
  await app.listen({ port: 8000 })

  console.log('server listening on 8000...')
})()
