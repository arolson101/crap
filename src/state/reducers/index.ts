import { combineReducers, Store } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import db, { State as DbState, dbSelectors } from './db';
import fi, { State as FiState, fiSelectors } from './fi';
import ping, { State as PingState } from './ping';
import views, { State as ViewsState, viewsSelectors } from './views';
import { Bank, Account } from '../records';
export { FI, formatAddress } from './fi';

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getDbs: (state: RootState) => dbSelectors.getDbs(state.db),
  getDbOpenError: (state: RootState) => dbSelectors.getDbOpenError(state.db),
  getDbIsOpen: (state: RootState) => dbSelectors.getDbIsOpen(state.db),
  getBank: (state: RootState, bankId: Bank.Id) => viewsSelectors.getBank(state.views, bankId),
  getBanks: (state: RootState) => viewsSelectors.getBanks(state.views),
  getAccount: (state: RootState, accountId: Account.Id) => viewsSelectors.getAccount(state.views, accountId),
  getAccounts: (state: RootState, bankId: Bank.Id) => viewsSelectors.getAccounts(state.views, bankId),
  getFIs: (state: RootState) => fiSelectors.getFIs(state.fi),
  getLocation: (state: RootState) => state.router.location,
  getPathname: (state: RootState) => state.router.location && state.router.location.pathname,
  isBankCreating: (state: RootState) => dbSelectors.isBankCreating(state.db),
  isBankUpdating: (state: RootState) => dbSelectors.isBankUpdating(state.db),
  isBankDeleting: (state: RootState) => dbSelectors.isBankDeleting(state.db),
  isAccountCreating: (state: RootState) => dbSelectors.isAccountCreating(state.db),
  isAccountUpdating: (state: RootState) => dbSelectors.isAccountUpdating(state.db),
  isAccountDeleting: (state: RootState) => dbSelectors.isAccountDeleting(state.db),
};

export interface RootState {
  ping: PingState;
  db: DbState;
  fi: FiState;
  router: RouterState;
  views: ViewsState;
}

export type RootStore = Store<RootState>;

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  fi,
  router: routerReducer,
  views,
});

export default rootReducer;
