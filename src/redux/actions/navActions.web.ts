import { ActionType, action } from 'typesafe-actions'
import qs from 'qs'
import { push } from 'connected-react-router'
import { paths } from '../../nav'
import { NavApi } from './navActions'

export const navActions: NavApi = {
  navBack: () => push(''),

  navHome: () => push(paths.root.home),
  navAccounts: () => push(paths.root.accounts),
  navBudgets: () => push(paths.root.budgets),

  navAccountView: (bankId: string, accountId: string) => push({
    pathname: paths.root.accounts,
    search: qs.stringify({ bankId, accountId })
  }),

  modalAccountCreate: () => push(paths.modal.accountCreate),
}
