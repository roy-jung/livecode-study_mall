export type Resolver = {
  [k: string]: {
    [key: string]: (parent: any, args: { [key: string]: any }, context: {}, info: any) => any
  }
}
