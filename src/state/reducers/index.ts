import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import db, { State as DbState, dbSelectors } from './db';
import fi, { State as FiState, fiSelectors } from './fi';
import ping, { State as PingState } from './ping';
import views, { State as ViewsState, viewsSelectors } from './views';
import { Bank } from '../records';
export { FI } from './fi';

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getDbs: (state: RootState) => dbSelectors.getDbs(state.db),
  getDbOpenError: (state: RootState) => dbSelectors.getDbOpenError(state.db),
  getBank: (state: RootState, bankId: Bank.Id) => viewsSelectors.getBank(state.views, bankId),
  getBanks: (state: RootState) => viewsSelectors.getBanks(state.views),
  getAccounts: (state: RootState, bankId: Bank.Id) => viewsSelectors.getAccounts(state.views, bankId),
  getFIs: (state: RootState) => fiSelectors.getFIs(state.fi),
};

export interface RootState {
  ping: PingState;
  db: DbState;
  fi: FiState;
  views: ViewsState;
}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  fi,
  router: routerReducer,
  views,
});

export default rootReducer;
