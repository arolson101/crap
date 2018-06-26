import { getType } from 'typesafe-actions'
import { NavigationActions, NavigationContainerComponent, NavigationNavigateAction } from 'react-navigation'
import { navActions, NavAction } from '../actions/navActions.native'

export interface NavState {
  navigator?: NavigationContainerComponent
}

const initialState: NavState = {}

export const navReducer = (state: NavState = initialState, action: NavAction): NavState => {
  console.log('nav', action)
  switch (action.type) {
    case getType(navActions.setTopNavigator):
      return { ...state, navigator: action.payload }

    case getType(navActions.navigate):
      if (state.navigator) {
        state.navigator.dispatch(action.payload)
      }
      return state

    default:
      return state
  }
}
