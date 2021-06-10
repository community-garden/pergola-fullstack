import { ApolloError } from "apollo-server-errors"
import {hasRole} from "keycloak-connect-graphql"
import * as R from "rambda"

import { neo4jdriver } from "../../config/neo4j"
import {presets} from "../../config/roles"
import {flatten, withinTransaction} from "../../lib/neo4j"
import {neo4jPointInput2geo_2d} from "../../lib/neo4j/point"

async function merge_GardenSettings( gardenSettings ) {
  const keys = Object.keys( gardenSettings )
  const keys_trusted = ["gardenId", "name", "infoPageMarkdown", "shortDescription", "homepageUrl", "logoUrl", "location"]
  const settings_checked = R.mergeAll( keys
    .filter(( k ) => keys_trusted.includes( k ))
    .map( k => k === "location" ? {[k]: neo4jPointInput2geo_2d( gardenSettings[k] )}  : {[k]: gardenSettings[k]} ))


  const query = `MERGE (garden:Garden {gardenId: $gardenId}) ${gardenSettings.name ? "SET garden.label = $name " : ""} 
  MERGE (settings:GardenSettings)-[:of]->(garden) 
  ${Object.keys( settings_checked ).map(( k ) => "SET settings." + k + " = $" + k ).join( " " )}
  RETURN settings`
  return await withinTransaction( neo4jdriver.session(), ( tx ) =>
    tx.run( query, settings_checked  ))
}

const Mutation = {
  mergeGardenSettings: hasRole( presets.garden_manager )(
    async ( _, { settings } ) => {
      let res = {}
      try {
        const result = await  merge_GardenSettings( settings )
        res = result.records?.[0] ? flatten( result.records[0] ).settings : {}
      } catch( e ) {
        console.error( "cannot execute mergeGardenSettings query", e )
        throw new ApolloError( "cannot execute mergeGardenSettings query", "TRANSACTION_ERROR", e.message )
      }
      return  res
    } )
}

export default { resolvers: { Mutation } }
