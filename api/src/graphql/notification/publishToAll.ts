import {auth, KeycloakContext} from "keycloak-connect-graphql"

import publishPushNotification from "../../notification/publishPushNotification"
import {MutationResolvers} from "../types/graphql"

const { publishToAll }: MutationResolvers<{kauth: KeycloakContext}> = {
  publishToAll: async ( _, args, {kauth}, info ) =>  {
    const {sub: userId } = ( kauth?.accessToken as unknown as any )?.content
    return !!( userId && publishPushNotification( args.message ).catch( e => console.error( e )))
  }
}
export default { resolvers: { Mutation: { publishToAll: auth ( publishToAll ) } } }
