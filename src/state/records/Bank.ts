import { iupdate } from '../../iupdate';
import { Record } from '../Record';
import { Account } from './Account';
import { DbChange } from '../../state/thunks/dbThunks';

export interface Bank extends Bank.Props, Record<Bank.Id, Bank.Props> { }

export namespace Bank {
  export type Id = ':bankId';

  export interface Props {
    readonly name: string;
    readonly web: string;
    readonly address: string;
    readonly notes: string;
    readonly favicon: string;

    readonly online: boolean;

    readonly fid: string;
    readonly org: string;
    readonly ofx: string;

    readonly username: string;
    readonly password: string;

    readonly accounts: Account.Id[];
  }

  export type Query = iupdate.Query<Props>;
  export const table = 'banks';
  export const schema = Record.genSchema('*accounts');

  export interface View {
    bank: Bank;
    accounts: Account[];
  }

  export namespace change {
    export const add = (t: number, bank: Bank): DbChange => ({
      table,
      t,
      adds: [bank]
    });

    export const edit = (t: number, id: Bank.Id, q: Query): DbChange => ({
      table,
      t,
      edits: [{ id, q }]
    });

    export const remove = (t: number, id: Bank.Id): DbChange => ({
      table,
      t,
      deletes: [id]
    });

    export const addAccount = (t: number, id: Bank.Id, accountId: Account.Id): DbChange => ({
      table,
      t,
      edits: [{
        id,
        q: { accounts: { $push: [accountId] } }
      }]
    });

    export const removeAccount = (t: number, id: Bank.Id, accountId: Account.Id): DbChange => ({
      table,
      t,
      edits: [{
        id,
        q: { accounts: { $exclude: [accountId] } }
      }]
    });
  }

  export const diff = (bank: Bank, values: Partial<Props>): Query => {
    return Object.keys(values).reduce(
      (q, prop): Query => {
        const val = values[prop];
        if (val !== bank[prop]) {
          return ({
            ...q,
            [prop]: { $set: val }
          });
        } else {
          return q;
        }
      },
      {} as Query
    );
  };
}
