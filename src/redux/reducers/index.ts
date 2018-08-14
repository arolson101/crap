import { combineReducers, Store } from 'redux'
import { AppAction } from '../actions/index'
import { navReducer, NavState } from './navReducer'

export interface AppState {
  nav: NavState,
}

export type AppStore = Store<AppState, AppAction>

export default combineReducers({
  nav: navReducer,
})

export const selectors = {
}

export namespace selectors {
  export type returnOf = { [K in keyof typeof selectors]: ReturnType<(typeof selectors)[K]> }
}
