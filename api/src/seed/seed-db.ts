import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import { fetch } from "cross-fetch"
import dotenv from "dotenv"
import pino from "pino"
import PinoColada from "pino-colada"

import { getToken } from "../scripts/getToken"

const logger = pino( {
  level: process.env.LOG_LEVEL || "info",
  prettifier: PinoColada,
  prettyPrint: {
    levelFirst: true,
  },
} )

dotenv.config()

// Specify host, port and path for GraphQL endpoint
const port = process.env.GRAPHQL_SERVER_PORT || 4001
const path = process.env.GRAPHQL_SERVER_PATH || "/graphql"
const host = process.env.GRAPHQL_SERVER_HOST || "0.0.0.0"

const uri = `http://${host}:${port}${path}`

const runMutations = async () => {
  const token = await getToken()
  const authLink = setContext(( _, { headers } ) => ( {
    headers: { ...headers, authorization: `Bearer ${token}` },
  } ))
  const client = new ApolloClient( {
    link: authLink.concat( new HttpLink( { uri, fetch } )),
    cache: new InMemoryCache(),
  } )

  const mutations = [
    {
      mutation: gql`
        mutation {
          seedNeo4jFromJSON
        }
      `,
      variables: {},
    },
  ]

  return Promise.all(
    mutations.map(( { mutation, variables } ) => {
      return client
        .mutate( {
          mutation,
          variables,
        } )
        .catch(( e ) => {
          throw new Error( e )
        } )
    } )
  )
}

runMutations()
  .then(() => {
    logger.info( "Database seeded!" )
  } )
  .catch(( e ) => logger.error( e ))
