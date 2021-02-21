import {GraphQLObjectResolver} from "apollo-graphql/lib/schema/resolveObject"
import {auth, KeycloakContext} from "keycloak-connect-graphql"
import {Neo4jDateInput} from "neo4j-graphql-js"

import {neo4jdriver} from "../../config/neo4j"
import {neo4jDateInput2iso, withinTransaction} from "../../lib/neo4j"
import {MutationResolvers} from "../types/graphql"
import {publishChange} from "./wateringTaskChange"

export const deleteQuery =
  `MATCH (period:WateringPeriod)-[:at]-(garden:Garden {gardenId: $gardenId})
  MATCH (t:WateringTask)-[:within]-(period)
  MATCH (u:User {id: $id})-[r:available]-(t)
  WHERE not(exists((u)-[:assigned]-(t))) AND date($from) <= date(t.date) AND date($till) >= date(t.date)
  DELETE r
 `

export const query =
  `MATCH (period:WateringPeriod)-[:at]-(garden:Garden {gardenId: $gardenId})
  MATCH (task:WateringTask {date: date($date)})-[:within]-(period)
  SET task.label = $date
  MERGE (user:User {id: $id}) SET user.label = $label
  MERGE (user)-[r:available]-(task)
  RETURN user, r, task
 `

const {setUserAvailability}: MutationResolvers<{ kauth: KeycloakContext }> = {
  setUserAvailability: async ( _, args, context, info ) => {
    await withinTransaction<any>( neo4jdriver.session(),  async ( tx ) => {
      const {content: {sub: id, preferred_username: label}} = context?.kauth?.accessToken as unknown as any
      const {gardenId, from, till, dates} = args
      //TODO: can we guarantee, that the delete query always executes before the merge query? using await leads to an error:
      //Neo4jError: Message 'COMMIT' cannot be handled by a session in the READY state.
      from && till && tx.run(
        deleteQuery, {
          gardenId,
          id,
          from: neo4jDateInput2iso( from ),
          till: neo4jDateInput2iso( till )
        } )
      dates.map(( date: Neo4jDateInput ) =>
        tx.run( query, {
          gardenId,
          id,
          label,
          date: neo4jDateInput2iso( date ),
        } )
      )
    } )
    publishChange()
    return true
  }
}
export default {resolvers: {Mutation: {setUserAvailability: auth( setUserAvailability )}}}
