import { NavigationActions } from 'react-navigation'
import { paths, navMessages } from '../../nav'
import { nativeActions } from './nativeActions'
import { NavApi } from './navActions'

export const navActions: NavApi = {
  navBack: () => nativeActions.navigate(NavigationActions.back()),

  navHome: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.home,
    // params: { title: navMessages.home },
  })),
  navAccounts: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
    // params: { title: navMessages.accounts },
  })),
  navBudgets: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.budgets,
    // params: { title: navMessages.budgets },
  })),

  navAccountView: (bankId: string, accountId: string) => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.root.accounts,
    action: NavigationActions.navigate({
      routeName: paths.account.view,
      params: { bankId, accountId }
    })
  })),

  modalAccountCreate: () => nativeActions.navigate(NavigationActions.navigate({
    routeName: paths.modal.accountCreate
  })),
}
