import { NavigationActions, NavigationContainerComponent, NavigationNavigateAction } from 'react-navigation'
import { ActionType, createAction } from 'typesafe-actions'
import { paths } from '../../nav'

export const navActions = {
  navigate: createAction('nav/navigate', resolve =>
    (navAction: NavigationNavigateAction) => resolve(navAction)
  ),
  setTopNavigator: createAction('nav/setTopNavigator', resolve =>
    (topNavigator: NavigationContainerComponent) => resolve(topNavigator)
  ),

  navHome: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.home })),
  navAccounts: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.accounts })),
  navBudgets: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.budgets })),
}

export type NavAction = ActionType<typeof navActions>
