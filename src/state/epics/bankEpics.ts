import { isActionOf } from 'typesafe-actions';
import { createNode, Bank } from '../docs';
import { RootEpic, actions } from '../../state';

const bankCreateEpic: RootEpic = (action$, store, {getTime}) =>
  action$.filter(isActionOf(actions.bankCreate))
    .mergeMap(async ({props}) => {
      const bank: Bank = createNode(props);
      const change = { table: Bank.table, t: getTime(), adds: [bank] };
      return actions.dbChange([change]);
    });

const bankUpdateEpic: RootEpic = (action$, store, {getTime}) =>
  action$.filter(isActionOf(actions.bankUpdate))
    .mergeMap(async ({id, q}) => {
      const change = { table: Bank.table, t: getTime(), updates: [{id, q}] };
      return actions.dbChange([change]);
    });

const bankDeleteEpic: RootEpic = (action$, store, {getTime}) =>
  action$.filter(isActionOf(actions.bankDelete))
    .mergeMap(async ({id}) => {
      const change = { table: Bank.table, t: getTime(), deletes: [id] };
      return actions.dbChange([change]);
    });

export default [
  bankCreateEpic,
  bankUpdateEpic,
  bankDeleteEpic,
];
