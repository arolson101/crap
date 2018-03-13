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
        for (let tableName of AppDatabase.tables) {
          const table: Dexie.Table<Record<any>, string> = db.table(tableName);
          const records = await table.where({_deleted: 0}).toArray();
          await dispatch(actions.recordsUpdated(tableName, records));
        }
        return dispatch(actions.dbOpenSuccess(db));
      } catch (err) {
        return dispatch(actions.dbOpenFailure(err));
      }
    },

  dbChange: (changes: DbChange[]): RootThunk =>
    async function dbChange(dispatch, getState) {
      try {
        const db = selectors.getDb(getState());
        const tables = uniq(changes.map(change => change.table)).map(db.table);
        const edits = new Map<TableName, Record<any>[]>();
        const deletes = new Map<TableName, string[]>();

        await db.transaction('rw', [...tables, db._changes], async () => {
          for (let change of changes) {
            const table = db.table(change.table);

            if (change.adds) {
              await table.bulkAdd(change.adds);
            }

            if (change.deletes) {
              const items = [];
              for (let id of change.deletes) {
                const doc: Record<any> = await table.get(id);
                const nextDoc = deleteRecord(doc, change.t);
                items.push(nextDoc);
              }
              await table.bulkPut(items);

              if (!deletes.has(change.table)) {
                deletes.set(change.table, []);
              }
              deletes.get(change.table)!.push(...change.deletes);
            }

            if (change.edits) {
              const items = [];
              for (let edit of change.edits) {
                const doc: Record<any> = await table.get(edit.id);
                const nextDoc = updateRecord(doc, { t: change.t, q: edit.q });
                items.push(nextDoc);
              }
              await table.bulkPut(items);

              if (!edits.has(change.table)) {
                edits.set(change.table, []);
              }
              edits.get(change.table)!.push(...items);
            }
          }

          const text = JSON.stringify(changes);
          await db._changes.add({ text });
        });

        edits.forEach((records, table) => {
          dispatch(actions.recordsUpdated(table, records));
        });

        deletes.forEach((keys, table) => {
          dispatch(actions.recordsDeleted(table, keys));
        });
      } catch (err) {
        console.error(err);
      }
    },
};
