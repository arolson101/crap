import { ActionType, action, createAction } from 'typesafe-actions'
import { NavigationActions, NavigationContainerComponent, NavigationNavigateAction } from 'react-navigation'
import { paths } from '../../nav'

export const navActions = {
  navigate: createAction('nav/navigate', resolve =>
    (navAction: NavigationNavigateAction) => resolve(navAction)
  ),
  setTopNavigator: createAction('nav/setTopNavigator', resolve =>
    (topNavigator: NavigationContainerComponent) => resolve(topNavigator)
  ),

  home: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.home })),
  accounts: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.accounts })),
  budgets: () => navActions.navigate(NavigationActions.navigate({ routeName: paths.root.budgets })),
}

export type NavAction = ActionType<typeof navActions>
