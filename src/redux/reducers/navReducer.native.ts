import { NavigationActions, NavigationContainerComponent } from 'react-navigation'
import { getType } from 'typesafe-actions'
import { paths } from '../../nav'
import { DbAction, dbActions } from '../actions/dbActions'
import { NativeAction, nativeActions } from '../actions/nativeActions'

export interface NavState {
  navigator?: NavigationContainerComponent
}

const initialState: NavState = {}

export const navReducer = (state: NavState = initialState, action: NativeAction | DbAction): NavState => {
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
