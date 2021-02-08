import { mergeTypeDefs, Schema } from "./graphql-schema"
import letitrain from "./letitrain"
import seed from "./seed"
import settings from "./settings"

export const typeDefs = mergeTypeDefs( [
  { root: [[__dirname, "root.schema.graphql"]] },
  settings.schema,
  seed.schema,
  letitrain.schema,
] as Schema[] )

export const resolvers = {
  Subscription: {
    ...letitrain.resolvers.Subscription
  },
  Mutation: {
    ...settings.resolvers.Mutation,
    ...seed.resolvers.Mutation,
    ...letitrain.resolvers.Mutation,
  },
}
