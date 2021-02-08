import { readFileSync } from "fs"
import { join } from "path"

type SchemaString = string;

type Path = string;
type File = string;
type PathFile = [Path, File];

export interface Schema {
  root?: PathFile[];
  query?: PathFile[];
  mutation?: PathFile[];
  subscription?: PathFile[];
}

function mergeSubSchemata( schemata: Schema[], sub: string ) {
  return {
    [sub]: schemata
      .map(( s ) => s[sub] )
      .filter(( i ) => i )
      .reduce(( acc, l ) => [].concat( acc, l ), [] ),
  }
}

export function mergeSchemata( schemata: Schema[] ): Schema {
  return {
    ...mergeSubSchemata( schemata, "root" ),
    ...mergeSubSchemata( schemata, "query" ),
    ...mergeSubSchemata( schemata, "mutation" ),
    ...mergeSubSchemata( schemata, "subscription" ),
  }
}

function mergeFiles( files?: [Path, File][] ): SchemaString {
  if( !files ) return ""
  const filenames = files.map(( f ) => join( ...f ))
  const filecontents = filenames.map(( f ) =>
    readFileSync( f ).toString( "utf-8" ).trim()
  )
  return filecontents.join( "\n\n" )
}

/** Allows Schema to be specified as modularized resolvers + schema.graphql **/
export function mergeTypeDefs( schemata: Schema[] ): SchemaString {
  const schema = mergeSchemata( schemata )
  const { root, subscription, query, mutation } = schema
  console.log( subscription )

  const makeSchemePart = ( kind: string, parts?: PathFile[] ) => parts ? `\ntype ${kind} {\n ${mergeFiles( parts )} \n}\n` : ""

  const typeDefs =
    mergeFiles( root ) +
    makeSchemePart( "Subscription", subscription ) +
    makeSchemePart( "Query", query ) +
    makeSchemePart( "Mutation", mutation )
  return typeDefs
}
