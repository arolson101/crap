import { iupdate } from '../../iupdate';
import { Record } from '../Record';

export interface Transaction extends Transaction.Props, Record<Transaction.Props> {}

export namespace Transaction {
  export interface Split {
    [categoryId: string]: number;
  }

  export interface Props {
    account: string;
    serverid?: string;
    time: number;
    type: string;
    name: string;
    memo: string;
    amount: number;
    split: Split;
  }

  export type Query = iupdate.Query<Props>;
  export const table = 'transactions';
  export const schema = Record.genSchema('account', 'time');
}
