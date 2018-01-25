import * as update from 'immutability-helper';
import { actions } from '../../state';
import { Node, RootThunk } from '../';
import { createNode } from './Node';

export interface Bank extends Bank.Props, Node<Bank.Props> {}

export namespace Bank {
  export interface Props {
    readonly name: string;
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = { [table]: '&id, name' };

  export const thunks = {
    bankCreate: (props: Props): RootThunk<Bank> => async (dispatch, getState, { getTime }) => {
      const bank: Bank = createNode(props);
      const change = { table, t: getTime(), adds: [bank] };
      await dispatch(actions.dbChange([change]));
      return bank;
    },

    bankUpdate: (id: string, q: Query): RootThunk => (dispatch, getState, { getTime }) => {
      const change = { table, t: getTime(), updates: [{id, q}] };
      return dispatch(actions.dbChange([change]));
    },

    bankDelete: (id: string, q: Query): RootThunk => (dispatch, getState, { getTime }) => {
      const change = { table, t: getTime(), updates: [{id, q}] };
      return dispatch(actions.dbChange([change]));
    },
  };
}
