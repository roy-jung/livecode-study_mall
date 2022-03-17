import { gql } from 'apollo-server-express'

const productSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String
    createdAt: Float
  }

  extend type Query {
    products(cursor: ID): [Product!]
    product(id: ID!): Product!
  }

  extend type Mutation {
    addProduct(imageUrl: String!, price: Int!, title: String!, description: String!): Product!
    updateProduct(
      id: ID!
      imageUrl: String
      price: Int
      title: String
      description: String
    ): Product!
    deleteProduct(id: ID!): ID!
  }
`

export default productSchema
