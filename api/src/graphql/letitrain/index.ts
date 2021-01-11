import setUserAvailability from "./setUserAvailability"

export default {
  resolvers: { ...setUserAvailability.resolvers },
  schema: { mutation: [[__dirname, "mutation.schema.graphql"]] },
}
