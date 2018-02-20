import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import db, { State as DbState, dbSelectors } from './db';
import ping, { State as PingState } from './ping';
import views, { State as ViewsState, viewsSelectors } from './views';

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getDbs: (state: RootState) => dbSelectors.getDbs(state.db),
  getDbOpenError: (state: RootState) => dbSelectors.getDbOpenError(state.db),
  getBank: (state: RootState, id: string) => viewsSelectors.getBank(state.views, id),
  getBanks: (state: RootState) => viewsSelectors.getBanks(state.views),
};

export interface RootState {
  ping: PingState;
  db: DbState;
  views: ViewsState;
}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  router: routerReducer,
  views,
});

export default rootReducer;
