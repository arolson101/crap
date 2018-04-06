import { actions, nav, selectors, createRecord, Bank, Account } from '../';
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

  bankCreateUI: (props: Bank.Props): RootThunk =>
    async function bankCreateUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.bankCreating(true));
        const bank = await dispatch(actions.bankCreate(props));
        dispatch(actions.bankCreating(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.replace(nav.accounts()));
        }
      } catch (err) {
        dispatch(actions.bankCreating(err));
      }
    },

  bankUpdate: (id: Bank.Id, q: Bank.Query): RootThunk =>
    function bankUpdate(dispatch, getState, { getTime }) {
      const t = getTime();
      const changes = [
        Bank.change.edit(t, id, q),
      ];
      return dispatch(actions.dbChange(changes));
    },

  bankUpdateUI: (id: Bank.Id, q: Bank.Query): RootThunk =>
    async function bankUpdateUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.bankUpdating(true));
        await dispatch(actions.bankUpdate(id, q));
        dispatch(actions.bankUpdating(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.goBack());
        }
      } catch (err) {
        dispatch(actions.bankUpdating(err));
      }
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

  bankDeleteUI: (bank: Bank): RootThunk =>
    async function bankDeleteUI(dispatch, getState) {
      try {
        const location = selectors.getPathname(getState());

        dispatch(actions.bankDeleting(true));
        await dispatch(actions.bankDelete(bank));
        dispatch(actions.bankDeleting(false));

        if (location === selectors.getPathname(getState())) {
          dispatch(actions.history.replace(nav.accounts()));
        }
      } catch (err) {
        dispatch(actions.bankDeleting(err));
      }
    },
};
