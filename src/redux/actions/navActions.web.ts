import { ActionType, action } from 'typesafe-actions'
import { push } from 'connected-react-router'
import { paths } from '../../nav'

export const navActions = {
  navBack: () => push(''),

  navHome: () => push(paths.root.home),
  navAccounts: () => push(paths.root.accounts),
  navBudgets: () => push(paths.root.budgets),

  modalAccountCreate: () => push(paths.modal.accountCreate),
}

export type NavAction = ActionType<typeof navActions>
