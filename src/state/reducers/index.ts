import { combineReducers, Store } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import fi, { State as FiState, fiSelectors } from './fi';
import { Bank, Account } from '../records';
export { FI, formatAddress } from './fi';

export const selectors = {
  getFIs: (state: RootState) => fiSelectors.getFIs(state.fi),
  getLocation: (state: RootState) => state.router.location,
};

export interface RootState {
  fi: FiState;
  router: RouterState;
}

export type RootStore = Store<RootState>;

export const rootReducer = combineReducers<RootState>({
  fi,
  router: routerReducer,
});

export default rootReducer;
