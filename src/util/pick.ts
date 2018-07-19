import _pick from 'lodash/pick'

type Many<T> = T | T[] // TODO: Should be ReadonlyArray<T>, but requires ts2.5 to not infinitely loop
export const pickT: <T extends object, U extends keyof T>(object: T, ...props: Array<Many<U>>) => Pick<T, U> = _pick
