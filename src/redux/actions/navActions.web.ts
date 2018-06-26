import { ActionType, action } from 'typesafe-actions'
import { push } from 'connected-react-router'
import { paths } from '../../nav'

export const navActions = {
  navHome: () => push(paths.root.home),
  navAccounts: () => push(paths.root.accounts),
  navBudgets: () => push(paths.root.budgets),
}

export type NavAction = ActionType<typeof navActions>
