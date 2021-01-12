/** Some helpers for functional programming **/

interface GroupFn {
  ( item: any ): any;
}

export function apply( f: any, args: any[] ) {
  return f( ...args )
}

export function unique<T>( vs: T[] ): T[] {
  return [...new Set( vs )]
}

export function concat( ...vs: any[] ) {
  return vs.filter(( i ) => i ).reduce(( acc, cur ) => acc.concat( cur ))
}

export function merge( ...maps: any[] ) {
  return maps.reduce(( acc, map ) => ( { ...acc, ...map } ))
}

export function groupBy( list: any[], f: GroupFn ) {
  return list.reduce(( acc, item ) => {
    const group = f( item )
    return { ...acc, [group]: concat( acc[group], [item] ) }
  }, {} )
}
