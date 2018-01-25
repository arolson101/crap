import * as update from 'immutability-helper';
import { createAction, getType } from 'typesafe-actions';
import { RootAction, AppDatabase } from '../index';

interface DbChange {
  table: string;
  t: number;
  adds?: object[];
  deletes?: string[];
  edits?: Array<{id: string, q: update.Query<any>}>;
}

export const actions = {
  dbInit: createAction('db/DB_INIT'),
  setDbs: createAction('db/SET_DBS', (dbs: string[]) => ({
    type: 'db/SET_DBS', dbs
  })),

  dbOpen: createAction('db/DB_OPEN', (name: string) => ({
    type: 'db/DB_OPEN', name
  })),
  dbOpenSuccess: createAction('db/DB_OPEN_SUCCESS', (db: AppDatabase) => ({
    type: 'db/DB_OPEN_SUCCESS', db
  })),
  dbOpenFailure: createAction('db/DB_OPEN_FAILURE', (err: Error) => ({
    type: 'db/DB_OPEN_FAILURE', err
  })),

  dbChange: createAction('db/DB_CHANGE', (changes: DbChange[]) => ({
    type: 'db/DB_CHANGE', changes
  })),
  dbChangeCommitted: createAction('db/DB_CHANGE_COMMITTED'),
};

export interface State {
  db?: AppDatabase;
  dbs: string[];
  isOpening: boolean;
  openError?: Error;
}

export const selectors = {
  getDb: (state: State) => {
    if (!state.db) {
      throw new Error('db is not open');
    }
    return state.db;
  }
};

const initialState: State = {
  db: undefined,
  dbs: [],
  isOpening: false,
  openError: undefined,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.setDbs):
      return { ...state, dbs: action.dbs };

    case getType(actions.dbOpen):
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
