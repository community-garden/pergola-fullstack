import { Neo4jDateInput } from "neo4j-graphql-js"

export function neo4jDateInput2iso( date: Neo4jDateInput ): string {
  return (
    parseInt( date.year ) + "-" + parseInt( date.month ) + "-" + parseInt( date.day )
  )
}

export function neo4jDateInput2Date( date: Neo4jDateInput): Date {
  return new Date(neo4jDateInput2iso(date))
}
