import { push } from 'connected-react-router'
import qs from 'qs'
import { paths } from '../../nav'
import { NavApi, NavPickerParams } from './navActions'

export const navActions: NavApi = {
  navBack: () => push(''),

  navPopToTop: () => push(''),

  login: () => push(paths.app),
  logout: () => push(paths.login),

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

  navAccount: (accountId: string, accountName: string) => push({
    pathname: paths.account,
    search: qs.stringify({ accountId, accountName })
  }),

  navAccountEdit: (accountId: string) => push({
    pathname: paths.accountEdit,
    search: qs.stringify({ accountId })
  }),

  navAccountCreate: (bankId: string) => push({
    pathname: paths.accountCreate,
    search: qs.stringify({ bankId })
  }),

  navPicker: (params: NavPickerParams) => {
    throw new Error('invalid route on this platform')
  }
}
