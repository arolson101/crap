import { getType } from 'typesafe-actions'
import { NavigationActions, NavigationContainerComponent, NavigationNavigateAction } from 'react-navigation'
import { navActions } from '../actions/navActions.native'

export interface NavState {
  navigator?: NavigationContainerComponent
}

const initialState: NavState = {}

export const navReducer = (state: NavState = initialState, action: any): NavState => {
  switch (action.type) {
    default:
      return state
  }
}
