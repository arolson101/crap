import { combineReducers, Store } from 'redux'
import { dbReducer, dbSelectors, DbState } from './dbReducer'
import { navReducer, NavState } from './navReducer'
import { AppAction } from '../actions/index'

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
  isIndexDbLoaded: (state: AppState) => dbSelectors.isIndexDbLoaded(state.db),
  isAppDbLoaded: (state: AppState) => dbSelectors.isAppDbLoaded(state.db),
  getIndexDb: (state: AppState) => dbSelectors.getIndexDb(state.db),
  getAppDb: (state: AppState) => dbSelectors.getAppDb(state.db),
}
