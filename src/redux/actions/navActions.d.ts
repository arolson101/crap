import * as web from './navActions.web'
import * as native from './navActions.native'

export interface NavApi {
  navBack: () => any
  login: () => any
  logout: () => any
  navHome: () => any
  navAccounts: () => any
  navBudgets: () => any
  navBank: (bankId: string) => any
  navBankCreate: () => any
  navBankEdit: (bankId: string) => any
  navAccount: (accountId: string, accountName: string) => any
  navAccountEdit: (accountId: string) => any
  navAccountCreate: (bankId: string) => any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './navActions.web'
