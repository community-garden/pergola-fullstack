import { mergeTypeDefs, Schema } from "./graphql-schema"
import letitrain from "./letitrain"
import notification from "./notification"
import seed from "./seed"
import settings from "./settings"

export const typeDefs = mergeTypeDefs( [
  { root: [[__dirname, "root.schema.graphql"]] },
  settings.schema,
  seed.schema,
  letitrain.schema,
  notification.schema
] as Schema[] )

export const resolvers = {
  Subscription: {
    ...letitrain.resolvers.Subscription
  },
  Mutation: {
    ...settings.resolvers.Mutation,
    ...seed.resolvers.Mutation,
    ...letitrain.resolvers.Mutation,
    ...notification.resolvers.Mutation
  },
}
