import { actions, RootThunk, createRecord, Bank } from '../';
import { DbChange } from './dbThunks';

export default {
  bankCreate: (props: Bank.Props): RootThunk<Bank> => async (dispatch, getState, { getTime, genId }) => {
    const bank: Bank = createRecord(genId, props);
    const change: DbChange = { table: Bank.table, t: getTime(), adds: [bank] };
    await dispatch(actions.dbChange([change]));
    return bank;
  },

  bankUpdate: (id: string, q: Bank.Query): RootThunk => (dispatch, getState, { getTime }) => {
    const change: DbChange = { table: Bank.table, t: getTime(), edits: [{id, q}] };
    return dispatch(actions.dbChange([change]));
  },

  bankDelete: (id: string): RootThunk => (dispatch, getState, { getTime }) => {
    const change: DbChange = { table: Bank.table, t: getTime(), deletes: [id] };
    return dispatch(actions.dbChange([change]));
  },
};
