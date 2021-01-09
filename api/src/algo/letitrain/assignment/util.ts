interface ListTransformFn<T> {
  ( vs: T[] ): T[];
}

interface ListConcatFn<T> {
  ( vs: T[][] ): T[];
}

export const unique: ListTransformFn<any> = ( vs ) => [...new Set( vs )]

export const concat: ListConcatFn<any> = ( vs ) =>
  vs.reduce(( acc, cur ) => acc.concat( cur ))
