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

  accountDelete: (account: Account): RootThunk =>
    function accountDelete(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Account.change.remove(t, account.id),
        Bank.change.removeAccount(t, account.bankId, account.id)
      ];
      return dispatch(actions.dbChange(changes));
    },
};
