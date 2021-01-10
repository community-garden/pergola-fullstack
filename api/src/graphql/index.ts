import letitrain from "./letitrain"

export { typeDefs } from "./graphql-schema"

export const resolvers = {
  Mutation: { ...letitrain.mutations },
}
