import { paths } from '../../nav'
import { nativeActions } from './nativeActions'
import { NavApi } from './navActions'
import { ActionType, createAction } from 'typesafe-actions'

export const navPop = createAction('nav/pop')
export const navPush = createAction('nav/push', resolve =>
  (routeName: string, params: object = {} as any) => resolve({
    routeName,
    params
  })
)
export const navSwitchToTab = createAction('nav/switchToTab', resolve =>
  (path: string) => resolve({
    path
  })
)

export const navActions: NavApi = {
  navBack: () => navPop(),

  login: () => navPush(paths.app),
  logout: () => navPush(paths.login),

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
