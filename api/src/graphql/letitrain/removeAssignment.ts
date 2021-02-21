import {auth, KeycloakContext} from "keycloak-connect-graphql"

import {neo4jdriver} from "../../config/neo4j"
import {neo4jDateInput2iso, withinTransaction} from "../../lib/neo4j"
import {MutationResolvers} from "../types/graphql"
import {publishChange} from "./wateringTaskChange"

export const deleteQuery = `
  MATCH (u:User {id: $id})-[r:assigned|available]->(t:WateringTask {date: date($date)})-[:within]->(period:WateringPeriod)-[:at]->(garden:Garden {gardenId: $gardenId})
  DELETE r 
`

const { removeAssignment }: MutationResolvers<{kauth: KeycloakContext}> = {
  removeAssignment: async ( _, args, { kauth }, info ) =>  {
    const {sub: userId } = ( kauth?.accessToken as unknown as any )?.content
    userId && await withinTransaction<any>( neo4jdriver.session(), ( tx ) => {
      tx.run( deleteQuery, {id: userId, date: neo4jDateInput2iso( args.date ), gardenId: args.gardenId} )
    } )
    publishChange()
    return true
  }
}
export default { resolvers: { Mutation: { removeAssignment: auth ( removeAssignment ) } } }
