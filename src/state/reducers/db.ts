import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';
import { AppDatabase } from '../AppDatabase';
import { GraphQLClient, makeClient } from '../GraphQLClient';

export interface State {
  db?: AppDatabase;
  dbs: string[];
  isOpening: boolean;
  openError?: Error;
}

export const dbSelectors = {
  getDb: (state: State) => {
    if (!state.db) {
      throw new Error('db is not open');
    }
    return state.db;
  },
  getDbs: (state: State) => {
    return state.dbs;
  },
  getDbOpenError: (state: State) => {
    return state.openError;
  },
  getDbIsOpen: (state: State): boolean => {
    return !!state.db;
  },
};

const initialState: State = {
  db: undefined,
  dbs: [],
  isOpening: false,
  openError: undefined,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.dbSetAvailableDbs):
      return { ...state, dbs: action.dbs };

    case getType(actions.dbOpenBegin):
      return { ...state, db: undefined, openError: undefined };

    case getType(actions.dbOpenSuccess):
      return { ...state, db: action.db };

    case getType(actions.dbOpenFailure):
      return { ...state, openError: action.err };

    default:
      return state;
  }
};

export default reducer;
