import * as update from 'immutability-helper';
import * as R from 'ramda';
import { actions, selectors, RootThunk, AppDatabase, Node, updateNode, deleteNode } from '../index';

interface DbChange {
  table: string;
  t: number;
  adds?: object[];
  deletes?: string[];
  edits?: Array<{id: string, q: update.Query<any>}>;
}

export default {
  dbInit: (): RootThunk => async (dispatch) => {
    const dbs = await AppDatabase.getDatabaseNames();
    dispatch(actions.setDbs(dbs));
  },

  dbOpen: (name: string): RootThunk => async (dispatch) => {
    try {
      const db = new AppDatabase(name);
      await db.open();
      return dispatch(actions.dbOpenSuccess(db));
    } catch (err) {
      return dispatch(actions.dbOpenFailure(err));
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
