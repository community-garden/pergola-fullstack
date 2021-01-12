import { Session, Transaction } from "neo4j-driver"

interface QueryFn<result> {
  ( tx: Transaction ): result;
}

export async function withinTransaction<result>(
  session: Session,
  fn: QueryFn<result>
): Promise<result | null> {
  const tx = session.beginTransaction()
  try {
    const result = fn( tx )
    await tx.commit()
    return result
  } catch ( e ) {
    console.error( e )
    await tx.rollback()
  } finally {
    session.close()
  }
}
