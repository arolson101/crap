import { combineReducers } from 'redux';

import db, { DbState, dbSelectors } from './db';
import ping, { PingState } from './ping';
import views, { ViewsState, viewsSelectors } from './views';

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getBank: (state: RootState, id: string) => viewsSelectors.getBank(state.views, id),
};

export interface RootState {
  ping: PingState;
  db: DbState;
  views: ViewsState;
}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  views,
});

export default rootReducer;
