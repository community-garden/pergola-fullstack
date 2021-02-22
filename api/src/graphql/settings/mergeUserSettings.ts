import { auth } from "keycloak-connect-graphql"

import { neo4jdriver } from "../../config/neo4j"
import { withinTransaction } from "../../lib/neo4j"
import { flatten } from "../../lib/neo4j/record"

export function query( settings ) {
  /** To prevent injections, we ensure only known keys are joined.
   *  TODO: Better do runtime checks against the typescript types **/
  const keys = Object.keys( settings )
  const keys_trusted = ["ui_locale", "letitrain_maximum_tasks"]
  const keys_checked = keys.filter(( k ) => keys_trusted.includes( k ))
  if ( keys_checked.length != keys.length ) {
    console.warn( "UNTRUSTED key in", keys )
    return null
  }

  return (
    "MERGE (user:User {id: $id}) SET user.label = $label SET user.email = $email " +
    "MERGE (settings:UserSettings)-[r:of]-(user) " +
    keys_checked.map(( k ) => "SET settings." + k + " = $" + k ).join( " " ) +
    " " +
    "RETURN settings"
  )
}

const Mutation = {
  ownMergeUserSettings: auth( async ( _, { settings }, ctx, info ) => {
    const {content: {sub: id, preferred_username: label, email}} = ctx?.kauth?.accessToken as unknown as any
    const result = await withinTransaction( neo4jdriver.session(), ( tx ) =>
      tx.run( query( settings ), {
        ...settings,
        id,
        label,
        email
      } )
    )
    return flatten( result.records[0] ).settings
  } ),
}

export default { resolvers: { Mutation } }
