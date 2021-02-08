import planWateringPeriods from "./planWateringPeriods"
import seedAvailabilitiesFromTests from "./seedAvailabilitiesFromTests"
import setUserAvailability from "./setUserAvailability"
import wateringTaskChange from "./wateringTaskChange"

export default {
  resolvers: {
    Subscription: {
      ...wateringTaskChange.resolvers.Subscription
    },
    Mutation: {
      ...setUserAvailability.resolvers.Mutation,
      ...seedAvailabilitiesFromTests.resolvers.Mutation,
      ...planWateringPeriods.resolvers.Mutation,
    },
  },
  schema: {
    mutation: [[__dirname, "mutation.schema.graphql"]],
    query: [[__dirname, "query.schema.graphql"]],
    subscription: [[__dirname, "subscription.schema.graphql"]]
  },
}
