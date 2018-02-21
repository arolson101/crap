import { actions, createRecord, Bank, Account } from '../';
import { RootThunk } from './';

export default {
  bankCreate: (props: Bank.Props): RootThunk<Bank> =>
    async function bankCreate(dispatch, getState, { getTime, genId }) {
      const t = getTime();
      const bank: Bank = createRecord(genId, props);
      const changes = [
        Bank.change.add(t, bank),
      ];
      await dispatch(actions.dbChange(changes));
      return bank;
    },

  bankUpdate: (id: Bank.Id, q: Bank.Query): RootThunk =>
    function bankUpdate(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Bank.change.edit(t, id, q),
      ];
      return dispatch(actions.dbChange(changes));
    },

  bankDelete: (bank: Bank): RootThunk =>
    function bankDelete(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Bank.change.remove(t, bank.id),
        ...bank.accounts.map(accountId =>
          Account.change.remove(t, accountId)
        )
      ];
      return dispatch(actions.dbChange(changes));
    },
};
