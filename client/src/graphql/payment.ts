import { gql } from 'graphql-tag'

export const EXECUTE_PAY = gql`
  mutation EXECUTE_PAY($ids: [ID!]) {
    executePay(ids: $ids)
  }
`
