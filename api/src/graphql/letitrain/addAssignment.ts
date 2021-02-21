import {auth, KeycloakContext} from "keycloak-connect-graphql"

import {neo4jdriver} from "../../config/neo4j"
import {neo4jDateInput2iso, withinTransaction} from "../../lib/neo4j"
import {MutationResolvers} from "../types/graphql"
import {publishChange} from "./wateringTaskChange"

export const query =
  "MATCH (user:User {id: $id}) " +
  "MATCH (task:WateringTask {date: date($date)})-[:within]->(period:WateringPeriod)-[:at]->(garden:Garden {gardenId: $gardenId}) " +
  "MERGE (user)-[r:assigned]-(task) " +
  "RETURN user, r, task"

const { addAssignment }: MutationResolvers<{kauth: KeycloakContext}> = {
  addAssignment: async ( _, args, { kauth }, info ) =>  {
    const {sub: userId } = ( kauth?.accessToken as unknown as any )?.content
    userId && await withinTransaction<any>( neo4jdriver.session(), ( tx ) => {
      tx.run( query, {id: userId, date: neo4jDateInput2iso( args.date ), gardenId: args.gardenId} )
    } )
    publishChange()
    return true
  }
}
export default { resolvers: { Mutation: { addAssignment: auth ( addAssignment ) } } }
