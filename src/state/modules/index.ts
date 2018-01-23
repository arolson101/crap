import { combineReducers } from 'redux';
import { getReturnOfExpression } from 'react-redux-typescript';

import ping, { State as PingState, actions as pingActions } from './ping';
import db, { State as DbState, actions as dbActions } from './db';

export const actions = {
  ...pingActions,
  ...dbActions,
};

const returnOfActions =
  Object.values(actions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;

export interface RootState {
  ping: PingState;
  db: DbState;
}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
});

export default rootReducer;
