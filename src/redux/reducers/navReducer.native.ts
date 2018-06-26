import { getType } from 'typesafe-actions'
import { NavigationActions, NavigationContainerComponent, NavigationNavigateAction } from 'react-navigation'
import { navActions, NavAction } from '../actions/navActions.native'
import { dbActions, DbAction } from '../actions/dbActions'
import { paths } from '../../nav';

export interface NavState {
  navigator?: NavigationContainerComponent
}

const initialState: NavState = {}

export const navReducer = (state: NavState = initialState, action: NavAction | DbAction): NavState => {
  switch (action.type) {
    case getType(navActions.setTopNavigator):
      return { ...state, navigator: action.payload }

    case getType(navActions.navigate):
      if (state.navigator) {
        state.navigator.dispatch(action.payload)
      }
      return state

    case getType(dbActions.setAppDb):
      if (state.navigator) {
        const isOpen = !!action.payload
        const routeName = isOpen ? paths.app : paths.login
        const dispatch = state.navigator.dispatch
        setTimeout(() => dispatch(NavigationActions.navigate({ routeName })), 1)
      }
      return state

    default:
      return state
  }
}
