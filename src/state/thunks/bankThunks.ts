import { actions, createRecord, Bank } from '../';
import { DbChange } from './dbThunks';
import { RootThunk } from './';

export default {
  bankCreate: (props: Bank.Props): RootThunk<Bank> =>
    async function bankCreate(dispatch, getState, { getTime, genId }) {
      const bank: Bank = createRecord(genId, props);
      const change: DbChange = { table: Bank.table, t: getTime(), adds: [bank] };
      await dispatch(actions.dbChange([change]));
      return bank;
    },

  bankUpdate: (id: string, q: Bank.Query): RootThunk =>
    function bankUpdate(dispatch, getState, { getTime }) {
      const change: DbChange = { table: Bank.table, t: getTime(), edits: [{ id, q }] };
      return dispatch(actions.dbChange([change]));
    },

  bankDelete: (id: string): RootThunk =>
    function bankDelete(dispatch, getState, { getTime }) {
      const change: DbChange = { table: Bank.table, t: getTime(), deletes: [id] };
      return dispatch(actions.dbChange([change]));
    },
};
