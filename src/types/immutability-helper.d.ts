// why aren't these exported?  or are they?

export module 'immutability-helper' {
  type Tree<T> = {[K in keyof T]?: Query<T[K]>}
  type Query<T> =
    | Tree<T>
    | ObjectOperators<T>
    | ArrayOperators<any>
    | SetOperators<any>

  type ObjectOperators<T> =
    | {$set: any}
    | {$toggle: Array<keyof T>}
    | {$unset: Array<keyof T>}
    | {$merge: Partial<T>}
    | {$apply: (old: T) => T}
    | ((old: T) => any)
  type ArrayOperators<T> =
    | {$push: T}
    | {$unshift: T}
    | {$splice: Array<[number, number]>}

  type MapOperators<K, V> = {$add: Array<[K, V]>} | {$remove: K[]}
  type SetOperators<T> = {$add: T[]} | {$remove: T[]}
}
