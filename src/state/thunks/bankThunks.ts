import { actions, RootThunk, createNode, Bank } from '../';

export default {
  bankCreate: (props: Bank.Props): RootThunk<Bank> => async (dispatch, getState, { getTime, genId }) => {
    const bank: Bank = createNode(genId, props);
    const change = { table: Bank.table, t: getTime(), adds: [bank] };
    await dispatch(actions.dbChange([change]));
    return bank;
  },

  bankUpdate: (id: string, q: Bank.Query): RootThunk => (dispatch, getState, { getTime }) => {
    const change = { table: Bank.table, t: getTime(), updates: [{id, q}] };
    return dispatch(actions.dbChange([change]));
  },

  bankDelete: (id: string, q: Bank.Query): RootThunk => (dispatch, getState, { getTime }) => {
    const change = { table: Bank.table, t: getTime(), updates: [{id, q}] };
    return dispatch(actions.dbChange([change]));
  },
};
