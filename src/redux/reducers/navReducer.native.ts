import { NavigationContainerComponent } from 'react-navigation'
import { getType } from 'typesafe-actions'
import { NativeAction, nativeActions } from '../actions/nativeActions'

export interface NavState {
  navigator?: NavigationContainerComponent
}

const initialState: NavState = {}

export const navReducer = (state: NavState = initialState, action: NativeAction): NavState => {
  switch (action.type) {
    case getType(nativeActions.setTopNavigator):
      return { ...state, navigator: action.payload }

    case getType(nativeActions.navigate):
      if (state.navigator) {
        state.navigator.dispatch(action.payload)
      }
      return state

    default:
      return state
  }
}
