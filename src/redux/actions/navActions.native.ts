import { NavigationActions, StackActions } from 'react-navigation'
import { paths } from '../../nav'
import { nativeActions } from './nativeActions'
import { NavApi, NavPickerParams } from './navActions'

export const navActions: NavApi = {
  navBack: () => navPop(),

  navPopToTop: () => nativeActions.navigate(StackActions.popToTop({})),

  login: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.app,
  })),

  navHome: () => navSwitchToTab(paths.root.home),
  navAccounts: () => navSwitchToTab(paths.root.accounts),
  navBudgets: () => navSwitchToTab(paths.root.budgets),

  navBank: createAction('nav/push', resolve =>
    (bankId: string) => resolve({
      routeName: paths.bank,
      params: { bankId }
    })
  ),

  navBankCreate: createAction('nav/push', resolve =>
    () => resolve({
      routeName: paths.bankCreate,
      params: {}
    })
  ),

  navBankCreate: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.bankCreate,
    params: {}
  })),

  navBankEdit: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.bankEdit,
    params: { bankId }
  })),

  navAccount: (accountId: string, accountName: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
    action: NavigationActions.navigate({
      routeName: paths.account,
      params: { accountId, accountName }
    })
  })),

  navAccountEdit: (accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.accountEdit,
    params: { accountId }
  })),

  navAccountCreate: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.accountCreate,
    params: { bankId }
  })),

  navTransactionEdit: (transactionId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.transactionEdit,
    params: { transactionId }
  })),

  navTransactionCreate: (accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.transactionCreate,
    params: { accountId }
  })),

  navPicker: (params: NavPickerParams) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.picker,
    params
  })),
}
