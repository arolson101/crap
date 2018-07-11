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
    pathname: paths.account,
    search: qs.stringify({ bankId })
  }),

  navBankCreate: () => push({
    pathname: paths.bankEdit,
  }),

  navBankEdit: (bankId: string) => push({
    pathname: paths.bankEdit,
    search: qs.stringify({ bankId })
  }),

  navAccount: (accountId: string) => push({
    pathname: paths.account,
    search: qs.stringify({ accountId })
  }),

  navAccountEdit: (accountId: string) => push({
    pathname: paths.accountEdit,
    search: qs.stringify({ accountId })
  }),

  navAccountCreate: (bankId: string) => push({
    pathname: paths.accountCreate,
    search: qs.stringify({ bankId })
  }),
}
