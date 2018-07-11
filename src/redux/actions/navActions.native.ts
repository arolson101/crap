import { NavigationActions } from 'react-navigation'
import { paths } from '../../nav'
import { nativeActions } from './nativeActions'
import { NavApi } from './navActions'

export const navActions: NavApi = {
  navBack: () => nativeActions.navigate(NavigationActions.back()),

  navHome: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.home,
  })),
  navAccounts: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
  })),
  navBudgets: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.budgets,
  })),

  navBank: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.bank,
    params: { bankId }
  })),

  navBankCreate: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.bankCreate,
      params: {}
    })
  })),

  navBankEdit: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.bankEdit,
      params: { bankId }
    })
  })),

  navAccount: (accountId: string, accountName: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
    action: NavigationActions.navigate({
      routeName: paths.account,
      params: { accountId, accountName }
    })
  })),

  navAccountEdit: (accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.accountEdit,
      params: { accountId }
    })
  })),

  navAccountCreate: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.accountCreate,
      params: { bankId }
    })
  })),
}
