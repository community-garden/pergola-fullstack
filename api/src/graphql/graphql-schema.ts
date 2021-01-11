import { readFileSync } from "fs"
import { join } from "path"

type SchemaString = string;

type Path = string;
type File = string;
type RootFile = [Path, File];
type MutationFile = [Path, File];

export interface Schema {
  root?: RootFile[];
  mutation?: MutationFile[];
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
    ...mergeSubSchemata( schemata, "mutation" ),
  }
}

function mergeFiles( files: [Path, File][] ): SchemaString {
  const filenames = files.map(( f ) => join( ...f ))
  const filecontents = filenames.map(( f ) =>
    readFileSync( f ).toString( "utf-8" ).trim()
  )
  return filecontents.join( "\n\n" )
}

/** Allows Schema to be specified as modularized resolvers + schema.graphql **/
export function mergeTypeDefs( schemata: Schema[] ): SchemaString {
  const schema = mergeSchemata( schemata )
  const typeDefs =
    mergeFiles( schema.root ) +
    "\n\n" +
    "type Mutation {\n" +
    mergeFiles( schema.mutation ) +
    "\n}"
  return typeDefs
}
