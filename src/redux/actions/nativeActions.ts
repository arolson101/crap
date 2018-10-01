import { NavigationStackAction, NavigationContainerComponent } from 'react-navigation'
import { ActionType, createAction } from 'typesafe-actions'

export const nativeActions = {
  navigate: createAction('nav/navigate', resolve =>
    (navAction: NavigationStackAction) => resolve(navAction)
  ),

  setTopNavigator: createAction('nav/setTopNavigator', resolve =>
    (topNavigator: NavigationContainerComponent) => resolve(topNavigator)
  ),
}

export type NativeAction = ActionType<typeof nativeActions>
