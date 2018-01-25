import Dexie from 'dexie';
import * as R from 'ramda';
import { isActionOf } from 'typesafe-actions';
import { actions, selectors, RootEpic } from '../modules';
import { AppDatabase, Node, updateNode, deleteNode } from '../';

const dbInitEpic: RootEpic = (action$, store) =>
  action$.filter(isActionOf(actions.dbInit))
    .mergeMap(async () => {
      const dbs = await Dexie.getDatabaseNames();
      return actions.setDbs(dbs);
    });

const dbOpenEpic: RootEpic = (action$, store) =>
  action$.filter(isActionOf(actions.dbOpen))
  .mergeMap(async ({name}) => {
    try {
      const db = new AppDatabase(name);
      await db.open();
      return actions.dbOpenSuccess(db);
    } catch (err) {
      return actions.dbOpenFailure(err);
    }
  });

const dbChangeEpic: RootEpic = (action$, store) =>
  action$.filter(isActionOf(actions.dbChange))
    .mergeMap(async ({changes}) => {
      const db = selectors.getDb(store.getState());
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
      return actions.dbChangeCommitted();
    });

const epics = [
  dbInitEpic,
  dbOpenEpic,
  dbChangeEpic,
];

export default epics;
