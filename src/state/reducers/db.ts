import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';
import { AppDatabase } from '../AppDatabase';

export interface DbState {
  db?: AppDatabase;
  dbs: string[];
  isOpening: boolean;
  openError?: Error;
}

export const dbSelectors = {
  getDb: (state: DbState) => {
    if (!state.db) {
      throw new Error('db is not open');
    }
    return state.db;
  }
};

const initialState: DbState = {
  db: undefined,
  dbs: [],
  isOpening: false,
  openError: undefined,
};

const reducer = (state: DbState = initialState, action: RootAction): DbState => {
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
