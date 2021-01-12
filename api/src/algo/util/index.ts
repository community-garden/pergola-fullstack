interface ListTransformFn<T> {
  ( vs: T[] ): T[];
}

interface ListConcatFn<T> {
  ( vs: T[][] ): T[];
}

interface GroupFn {
  ( item: any ): any;
}

export const unique: ListTransformFn<any> = ( vs ) => [...new Set( vs )]

export const concat: ListConcatFn<any> = ( vs ) =>
  vs.reduce(( acc, cur ) => acc.concat( cur ))

export function groupBy( list: any[], f: GroupFn ) {
  return list.reduce(( acc, item ) => {
    const group = f( item )
    return { ...acc, [group]: [...( acc[group] || [] ), item] }
  }, {} )
}
