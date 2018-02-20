import * as update from 'immutability-helper';
import { Record } from '../Record';
import { Account } from './Account';

export interface Transaction extends Transaction.Props, Record<Transaction.Id, Transaction.Props> {}

export namespace Transaction {
  export type Id = ':transactionId';

  export interface Split {
    [categoryId: string]: number;
  }

  export interface Props {
    account: Account.Id;
    serverid?: string;
    time: number;
    type: string;
    name: string;
    memo: string;
    amount: number;
    split: Split;
  }

  export type Query = update.Query<Props>;
  export const table = 'transactions';
  export const schema = Record.genSchema('account', 'time');
}
