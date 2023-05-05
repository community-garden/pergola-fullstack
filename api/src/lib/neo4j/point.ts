import {Point} from "neo4j-driver"

export function neo4jPointInput2geo_2d( point: Point ): string {
  return `point({latitude: ${point.x}, longitude: ${point.y} }) AS geo_2d`
}
