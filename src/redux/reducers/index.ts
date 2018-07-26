import { combineReducers, Store } from 'redux'
import { AppAction } from '../actions/index'
import { dbReducer, dbSelectors, DbState } from './dbReducer'
import { navReducer, NavState } from './navReducer'

export interface AppState {
  db: DbState,
  nav: NavState,
}

export type AppStore = Store<AppState, AppAction>

export default combineReducers({
  db: dbReducer,
  nav: navReducer,
})

export const selectors = {
  getAppGraphQLClient: (state: AppState) => dbSelectors.getAppGraphQLClient(state.db),
}

export namespace selectors {
  export type returnOf = { [K in keyof typeof selectors]: ReturnType<(typeof selectors)[K]> }
}
