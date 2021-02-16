import publishToAll from "./publishToAll"
import pushSubscribe from "./pushSubscribe"
import sendWelcomeMail from "./sendWelcomeMail"

export default {
  resolvers: {
    Mutation: {
      ...pushSubscribe.resolvers.Mutation,
      ...publishToAll.resolvers.Mutation,
      ...sendWelcomeMail.resolvers.Mutation
    },
  },
  schema: {
    root: [[__dirname, "root.schema.graphql"]],
    mutation: [[__dirname, "mutation.schema.graphql"]],
  }
}
