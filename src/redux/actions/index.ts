import { navActions } from './navActions'
import { NativeAction } from './nativeActions'

export const actions = {
  ...navActions,
}

type ReturnAny<T> =
  T extends () => any ? () => any :
  T extends (a: infer A) => any ? (a: A) => any :
  T extends (a: infer A, b: infer B) => any ? (a: A, b: B) => any :
  T extends (a: infer A, b: infer B, c: infer C) => any ? (a: A, b: B, c: C) => any :
  T extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? (a: A, b: B, c: C, d: D) => any :
  never

export type actions = { [K in keyof typeof actions]: ReturnAny<(typeof actions)[K]> }

export type AppAction =
  NativeAction
