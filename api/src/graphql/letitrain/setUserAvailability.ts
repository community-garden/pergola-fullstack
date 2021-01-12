import { auth } from "keycloak-connect-graphql"
import { Neo4jDateInput } from "neo4j-graphql-js"

import { neo4jdriver } from "../../config/neo4j"
import { neo4jDateInput2iso,withinTransaction } from "../../lib/neo4j"

export const query =
  "MERGE (user:User {id: $id}) SET user.label = $label " +
  "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
  "MERGE (user)-[r:available]-(task) " +
  "RETURN user, r, task"

const Mutation = {
  setUserAvailability: auth( async ( _, args, ctx, info ) => {
    const result = await withinTransaction( neo4jdriver.session(), ( tx ) =>
      args.dates.map( async ( date: Neo4jDateInput ) => {
        tx.run( query, {
          id: ctx.kauth.accessToken.content.sub,
          label: ctx.kauth.accessToken.content.preferred_username,
          date: neo4jDateInput2iso( date ),
        } )
      } )
    )
    return result ? true : false
  } ),
}

export default { resolvers: { Mutation } }
