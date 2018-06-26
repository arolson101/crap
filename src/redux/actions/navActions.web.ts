import { ActionType, action } from 'typesafe-actions'
import { push } from 'connected-react-router'
import { paths } from '../../nav'

export const navActions = {
  home: () => push(paths.root.home),
  accounts: () => push(paths.root.accounts),
  budgets: () => push(paths.root.budgets),
}

export type NavAction = ActionType<typeof navActions>
