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

  modalBankCreate: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.bankCreate,
      params: {}
    })
  })),

  modalBankEdit: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.bankEdit,
      params: { bankId }
    })
  })),

  navAccount: (accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
    action: NavigationActions.navigate({
      routeName: paths.account,
      params: { accountId }
    })
  })),

  modalAccountEdit: (accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.accountEdit,
      params: { accountId }
    })
  })),

  modalAccountCreate: (bankId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal,
    action: NavigationActions.navigate({
      routeName: paths.accountCreate,
      params: { bankId }
    })
  })),
}
