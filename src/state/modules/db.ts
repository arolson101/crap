import * as update from 'immutability-helper';
import * as R from 'ramda';
import { createAction, getType } from 'typesafe-actions';
import { selectors, RootAction, RootThunk, AppDatabase, Node, updateNode, deleteNode } from '../index';

interface DbChange {
  table: string;
  t: number;
  adds?: object[];
  deletes?: string[];
  edits?: Array<{id: string, q: update.Query<any>}>;
}

export const dbActions = {
  setDbs: createAction('db/SET_DBS', (dbs: string[]) => ({
    type: 'db/SET_DBS', dbs
  })),

  dbOpenBegin: createAction('db/DB_OPEN_BEGIN'),
  dbOpenSuccess: createAction('db/DB_OPEN_SUCCESS', (db: AppDatabase) => ({
    type: 'db/DB_OPEN_SUCCESS', db
  })),
  dbOpenFailure: createAction('db/DB_OPEN_FAILURE', (err: Error) => ({
    type: 'db/DB_OPEN_FAILURE', err
  })),
};

export const dbThunks = {
  dbInit: (): RootThunk => async (dispatch) => {
    const dbs = await AppDatabase.getDatabaseNames();
    dispatch(dbActions.setDbs(dbs));
  },

  dbOpen: (name: string): RootThunk => async (dispatch) => {
    try {
      const db = new AppDatabase(name);
      await db.open();
      return dispatch(dbActions.dbOpenSuccess(db));
    } catch (err) {
      return dispatch(dbActions.dbOpenFailure(err));
    }
  },

  dbChange: (changes: DbChange[]): RootThunk => async (dispatch, getState) => {
    const db = selectors.getDb(getState());
    const tables = R.uniq(changes.map(change => change.table)).map(db.table);

    await db.transaction('rw', [...tables, db._changes], async () => {
      for (let change of changes) {
        const table = db.table(change.table);

        if (change.adds) {
          await table.bulkAdd(change.adds);
        }

        if (change.deletes) {
          const items = [];
          for (let id of change.deletes) {
            const doc: Node<any> = await table.get(id);
            const nextDoc = deleteNode(doc, change.t);
            items.push(nextDoc);
          }
          await table.bulkPut(items);
        }

        if (change.edits) {
          const items = [];
          for (let edit of change.edits) {
            const doc: Node<any> = await table.get(edit.id);
            const nextDoc = updateNode(doc, { t: change.t, q: edit.q });
            items.push(nextDoc);
          }
          await table.bulkPut(items);
        }
      }

      const text = JSON.stringify(changes);
      await db._changes.add({text});
    });
  },
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
    case getType(dbActions.setDbs):
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
