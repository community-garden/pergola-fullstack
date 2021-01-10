import letitrain from "./letitrain"
import seed from "./seed"

export { typeDefs } from "./graphql-schema"

export const resolvers = {
  Mutation: { ...seed.mutations, ...letitrain.mutations },
}
