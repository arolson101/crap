import { combineReducers, Store } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import db, { State as DbState, dbSelectors } from './db';
import fi, { State as FiState, fiSelectors } from './fi';
import ping, { State as PingState } from './ping';
import { Bank, Account } from '../records';
export { FI, formatAddress } from './fi';

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getDbs: (state: RootState) => dbSelectors.getDbs(state.db),
  getDbOpenError: (state: RootState) => dbSelectors.getDbOpenError(state.db),
  getDbIsOpen: (state: RootState) => dbSelectors.getDbIsOpen(state.db),
  getFIs: (state: RootState) => fiSelectors.getFIs(state.fi),
  getLocation: (state: RootState) => state.router.location,
  getPathname: (state: RootState) => state.router.location && state.router.location.pathname,
};

export interface RootState {
  ping: PingState;
  db: DbState;
  fi: FiState;
  router: RouterState;
}

export type RootStore = Store<RootState>;

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  fi,
  router: routerReducer,
});

export default rootReducer;
