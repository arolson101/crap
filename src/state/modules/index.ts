import { getReturnOfExpression } from 'react-redux-typescript';
import { combineReducers } from 'redux';
import { Epic } from 'redux-observable';

import ping, { State as PingState, actions as pingActions } from './ping';
import db, { State as DbState, actions as dbActions, selectors as dbSelectors } from './db';
import { EpicDependencies } from '../epics';
import { Bank } from '../docs/Bank';

export const actions = {
  ...pingActions,
  ...dbActions,
  ...Bank.actions
};

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
};

const returnOfActions = Object.values(actions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;

export interface RootState {
  ping: PingState;
  db: DbState;
}

export interface RootEpic extends Epic<RootAction, RootState, EpicDependencies> {}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
});

export default rootReducer;
