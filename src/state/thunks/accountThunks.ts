import { actions, createRecord, Bank, Account } from '../';
import { RootThunk } from './';

export default {
  accountCreate: (bankId: Bank.Id, props: Account.Props): RootThunk<Account> =>
    async function accountCreate(dispatch, getState, { getTime, genId }) {
      const t = getTime();
      const account: Account = createRecord(genId, props);
      const changes = [
        Account.change.add(t, account),
        Bank.change.addAccount(t, bankId, account.id),
      ];
      await dispatch(actions.dbChange(changes));
      return account;
    },

  accountUpdate: (id: Account.Id, q: Account.Query): RootThunk =>
    function accountUpdate(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Account.change.edit(t, id, q),
      ];
      return dispatch(actions.dbChange(changes));
    },

  accountDelete: (bankId: Bank.Id, accountId: Account.Id): RootThunk =>
    function accountDelete(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Account.change.remove(t, accountId),
        Bank.change.removeAccount(t, bankId, accountId)
      ];
      return dispatch(actions.dbChange(changes));
    },
};
