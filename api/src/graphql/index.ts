import { mergeTypeDefs, Schema } from "./graphql-schema"
import letitrain from "./letitrain"
import seed from "./seed"

export const typeDefs = mergeTypeDefs( [
  { root: [[__dirname, "root.schema.graphql"]] },
  seed.schema,
  letitrain.schema,
] as Schema[] )

export const resolvers = {
  Mutation: { ...seed.resolvers.Mutation, ...letitrain.resolvers.Mutation },
}
