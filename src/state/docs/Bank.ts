import * as update from 'immutability-helper';
import { createAction } from 'typesafe-actions';
import { Node } from './Node';

export interface Bank extends Bank.Props, Node<Bank.Props> {}

export namespace Bank {
  export interface Props {
    readonly name: string;
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = { [table]: '&id, name' };

  export const actions = {
    bankCreate: createAction('docs/Bank/create', (props: Props) => ({
      type: 'docs/Bank/create', props
    })),
    bankUpdate: createAction('docs/Bank/update', (id: string, q: Query) => ({
      type: 'docs/Bank/update', id, q
    })),
    bankDelete: createAction('docs/Bank/delete', (id: string) => ({
      type: 'docs/Bank/delete', id
    })),
    transaction: createAction('docs/db/transaction', (changes: any[]) => ({
      type: 'docs/db/transaction', changes
    })),
  };
}
