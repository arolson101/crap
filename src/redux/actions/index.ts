import { dbActions, DbAction } from './dbActions'
import { navActions } from './navActions'
import { NativeAction } from './nativeActions'

export const actions = {
  ...dbActions,
  ...navActions,
}

export type AppAction =
  DbAction
  | NativeAction
