import { dbActions, DbAction } from './dbActions'
import { navActions, NavAction } from './navActions'

export const actions = {
  ...dbActions,
  ...navActions,
}

export type AppAction =
  DbAction
  | NavAction
