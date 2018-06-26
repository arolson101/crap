import { NavigationActions, NavigationContainerComponent, NavigationBackActionPayload } from 'react-navigation'
import { ActionType, createAction } from 'typesafe-actions'
import { paths } from '../../nav'

export const navActions = {
  navigate: createAction('nav/navigate', resolve =>
    (navAction: NavigationBackActionPayload) => resolve(navAction)
  ),
  setTopNavigator: createAction('nav/setTopNavigator', resolve =>
    (topNavigator: NavigationContainerComponent) => resolve(topNavigator)
  ),

  navBack: () => navActions.navigate(NavigationActions.back()),

  navHome: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.home })),
  navAccounts: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.accounts })),
  navBudgets: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.budgets })),

  modalAccountCreate: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.modal.accountCreate })),
}

export type NavAction = ActionType<typeof navActions>
