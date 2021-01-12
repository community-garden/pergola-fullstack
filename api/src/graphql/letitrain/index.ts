import seedAvailabilitiesFromTests from "./seedAvailabilitiesFromTests"
import setUserAvailability from "./setUserAvailability"

export default {
  resolvers: {
    Mutation: {
      ...setUserAvailability.resolvers.Mutation,
      ...seedAvailabilitiesFromTests.resolvers.Mutation,
    },
  },
  schema: { mutation: [[__dirname, "mutation.schema.graphql"]] },
}
