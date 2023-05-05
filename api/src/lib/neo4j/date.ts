import {Date as Neo4jDate } from "neo4j-driver"

export function neo4jDateInput2iso( date: Neo4jDate ): string {
  return (
    String( date.year ) + "-" + String( date.month ) + "-" + String( date.day )
  )
}

export function neo4jDateInput2Date( date: Neo4jDate ): Date {
  return new Date( neo4jDateInput2iso( date ))
}
