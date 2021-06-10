import { Neo4jPointInput } from "neo4j-graphql-js"

export function neo4jPointInput2geo_2d( point: Neo4jPointInput ): string {
  return `point({latitude: ${point.latitude}, longitude: ${point.longitude} }) AS geo_2d`
}
