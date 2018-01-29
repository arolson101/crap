import { createAction, getType } from 'typesafe-actions';
import { RootAction, AppDatabase } from '../index';

export const dbActions = {
  dbSetAvailableDbs: createAction('db/SET_AVAILABLE_DBS', (dbs: string[]) => ({
    type: 'db/SET_AVAILABLE_DBS', dbs
  })),

  dbOpenBegin: createAction('db/DB_OPEN_BEGIN'),
  dbOpenSuccess: createAction('db/DB_OPEN_SUCCESS', (db: AppDatabase) => ({
    type: 'db/DB_OPEN_SUCCESS', db
  })),
  dbOpenFailure: createAction('db/DB_OPEN_FAILURE', (err: Error) => ({
    type: 'db/DB_OPEN_FAILURE', err
  })),
};

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
    case getType(dbActions.dbSetAvailableDbs):
      return { ...state, dbs: action.dbs };

    case getType(dbActions.dbOpenBegin):
      return { ...state, db: undefined, openError: undefined };

    case getType(dbActions.dbOpenSuccess):
      return { ...state, db: action.db };

    case getType(dbActions.dbOpenFailure):
      return { ...state, openError: action.err };

    default:
      return state;
  }
};

export default reducer;
