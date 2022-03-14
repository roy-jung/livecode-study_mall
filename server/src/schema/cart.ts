import { gql } from 'apollo-server-express'

const cartSchema = gql`
  type CartItem {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    amount: Int!
  }

  extend type Query {
    cart: [CartItem!]
  }

  extend type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    executePay(ids: [ID!]): [ID!]
  }
`

export default cartSchema
