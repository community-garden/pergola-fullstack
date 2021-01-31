import { GraphQLObjectResolver } from "apollo-graphql/lib/schema/resolveObject"
import {auth, KeycloakContext} from "keycloak-connect-graphql"
import { Neo4jDateInput } from "neo4j-graphql-js"

import { neo4jdriver } from "../../config/neo4j"
import { neo4jDateInput2iso,withinTransaction } from "../../lib/neo4j"
import {MutationResolvers} from "../types/graphql"

export const deleteQuery = `
  MATCH (u:User {id: $id})-[r:available]-(t:WateringTask)
  WHERE not(exists((u)-[:assigned]-(t))) AND date($from) <= date(t.date) AND date($till) >= date(t.date)
  DELETE r
`

export const query =
  "MERGE (user:User {id: $id}) SET user.label = $label " +
  "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
  "MERGE (user)-[r:available]-(task) " +
  "RETURN user, r, task"

const { setUserAvailability }: MutationResolvers<{kauth: KeycloakContext}> = {
  setUserAvailability: async ( _, args, context, info ) =>  {
    const result = await withinTransaction<any>( neo4jdriver.session(), ( tx ) => {
      const { content: { sub: id, preferred_username: label }} = context?.kauth?.accessToken as unknown as any
      const {from, till, dates} = args
      from && till && tx.run(
        deleteQuery, {
          id,
          from: neo4jDateInput2iso( from ),
          till: neo4jDateInput2iso( till )
      } )
      dates.map( async ( date: Neo4jDateInput ) => {
        tx.run( query, {
          id,
          label,
          date: neo4jDateInput2iso( date ),
        } )
      } )
    } )
    return result ? true : false

  }
}
export default { resolvers: { Mutation: { setUserAvailability: auth ( setUserAvailability ) } } }
