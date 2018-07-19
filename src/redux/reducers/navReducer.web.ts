import { NavigationContainerComponent } from 'react-navigation'

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
