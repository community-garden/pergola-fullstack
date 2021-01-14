/** Resolvers for common settings (per Garden, User, …)
 *  Settings for module specific Objects should be places in the directory of the modules resolvers.
 **/

import mergeUserSettings from "./mergeUserSettings"

export default {
  resolvers: {
    Mutation: {
      ...mergeUserSettings.resolvers.Mutation,
    },
  },
  schema: {
    root: [[__dirname, "root.schema.graphql"]],
    mutation: [[__dirname, "mutation.schema.graphql"]],
  },
}
