import * as web from './navActions.web'
import * as native from './navActions.native'

export interface NavApi {
  navBack: () => any
  navHome: () => any
  navAccounts: () => any
  navBudgets: () => any
  navAccountView: (bankId: string, accountId: string) => any
  modalAccountCreate: () => any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './navActions.web'
