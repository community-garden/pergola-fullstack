import {auth, KeycloakContext} from "keycloak-connect-graphql"

import subscribe from "../../notification/subscriptions"
import {MutationResolvers} from "../types/graphql"

const {pushSubscribe}: MutationResolvers<{ kauth: KeycloakContext }> = {
  pushSubscribe: async ( _, args, {kauth}, info ) => {
    const {sub: userId } = ( kauth?.accessToken as unknown as any )?.content
    userId && subscribe( args.subscription, userId as string )
    return true

  }
}
export default {resolvers: {Mutation: {pushSubscribe: auth( pushSubscribe )}}}
