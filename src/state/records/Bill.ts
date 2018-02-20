import * as update from 'immutability-helper';
import { Record } from '../Record';
import { Account } from './Account';
import { Category } from './Category';

export interface Bill extends Bill.Props, Record<Bill.Id, Bill.Props> {}

export namespace Bill {
  export type Id = ':billId';

  export interface Props {
    readonly name: string;
    readonly group: string;
    readonly web: string;
    readonly favicon?: string;
    readonly notes: string;
    readonly amount: number;
    readonly account?: Account.Id;
    readonly category: Category.Id;
    readonly rruleString: string;
    readonly showAdvanced?: boolean;
  }

  export type Query = update.Query<Props>;
  export const table = 'bills';
  export const schema = Record.genSchema('account', 'category');
}
