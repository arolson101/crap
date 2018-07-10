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

  navBank: (bankId: string) => push({
    pathname: paths.account.view,
    search: qs.stringify({ bankId })
  }),

  modalBankCreate: () => push({
    pathname: paths.modal.bankCreate,
  }),

  modalBankEdit: (bankId: string) => push({
    pathname: paths.modal.bankEdit,
    search: qs.stringify({ bankId })
  }),

  navAccount: (accountId: string) => push({
    pathname: paths.account.view,
    search: qs.stringify({ accountId })
  }),

  modalAccountEdit: (accountId: string) => push({
    pathname: paths.modal.accountEdit,
    search: qs.stringify({ accountId })
  }),

  modalAccountCreate: () => push(paths.modal.accountCreate),
}
