import Dexie from 'dexie';
import uniq from 'lodash-es/uniq';
import { iupdate } from '../../iupdate';
import { actions, selectors, AppDatabase, Record, updateRecord, deleteRecord, TableName } from '../index';
import { RootThunk } from './';

export interface DbRecordEdit {
  id: string;
  q: iupdate.Query<{}>;
}

export interface DbChange {
  table: TableName;
  t: number;
  adds?: Record<any>[];
  deletes?: string[];
  edits?: Array<DbRecordEdit>;
}

// update.extend('$erase', function(tax, original) {
//   return original + (tax * original);
// });

export default {
  dbInit: (): RootThunk =>
    async function dbInit(dispatch) {
      const dbs = await AppDatabase.getDatabaseNames();
      dispatch(actions.dbSetAvailableDbs(dbs));
    },

  dbOpen: (name: string, password: string): RootThunk =>
    async function dbOpen(dispatch, getState, { openDb }) {
      try {
        const db = await openDb(name);
        return dispatch(actions.dbOpenSuccess(db));
      } catch (err) {
        return dispatch(actions.dbOpenFailure(err));
      }
    },

  dbChange: (changes: DbChange[]): RootThunk =>
    async function dbChange(dispatch, getState) {
      const db = selectors.getDb(getState());
      return db.change(changes);
    },
};
