import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import { fetch } from "cross-fetch"
import dotenv from "dotenv"
import pino from "pino"
import PinoColada from "pino-colada"

import { getSeedMutations } from "./seed-mutations"

const logger = pino( {
  level: process.env.LOG_LEVEL || "info",
  prettifier: PinoColada,
  prettyPrint: {
    levelFirst: true,
  },
} )

dotenv.config()

const {
  GRAPHQL_SERVER_HOST: host,
  GRAPHQL_SERVER_PORT: port,
  GRAPHQL_SERVER_PATH: path,
} = process.env

const uri = `http://${host}:${port}${path}`

const client = new ApolloClient( {
  link: new HttpLink( { uri, fetch } ),
  cache: new InMemoryCache(),
} )

const runMutations = async () => {
  const mutations = await getSeedMutations()

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
