import { actions, nav, selectors, createRecord, Bank, Account } from '../';
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

  accountCreateUI: (bankId: Bank.Id, props: Account.Props): RootThunk =>
    async function accountCreateUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.accountCreating(true));
        const account = await dispatch(actions.accountCreate(bankId, props));
        dispatch(actions.accountCreating(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.replace(nav.accountView(bankId, account.id)));
        }
      } catch (err) {
        dispatch(actions.accountCreating(err));
      }
    },

  accountUpdate: (id: Account.Id, q: Account.Query): RootThunk =>
    function accountUpdate(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Account.change.edit(t, id, q),
      ];
      return dispatch(actions.dbChange(changes));
    },

  accountUpdateUI: (id: Account.Id, q: Account.Query): RootThunk =>
    async function accountUpdateUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.accountUpdating(true));
        await dispatch(actions.accountUpdate(id, q));
        dispatch(actions.accountUpdating(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.goBack());
        }
      } catch (err) {
        dispatch(actions.accountUpdating(err));
      }
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

  accountDeleteUI: (bankId: Bank.Id, accountId: Account.Id): RootThunk =>
    async function accountDeleteUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.accountDeleting(true));
        await dispatch(actions.accountDelete(bankId, accountId));
        dispatch(actions.accountDeleting(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.goBack());
        }
      } catch (err) {
        dispatch(actions.accountDeleting(err));
      }
    },
};
