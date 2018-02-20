import * as update from 'immutability-helper';
import { Record } from '../Record';
import { Account } from './Account';

export interface Bank extends Bank.Props, Record<Bank.Id, Bank.Props> {}

export namespace Bank {
  export type Id = ':bankId';

  export interface Props {
    readonly fi?: string;

    readonly name: string;
    readonly web?: string;
    readonly address?: string;
    readonly notes?: string;
    readonly favicon?: string;

    readonly online?: boolean;

    readonly fid?: string;
    readonly org?: string;
    readonly ofx?: string;

    readonly username?: string;
    readonly password?: string;

    readonly accounts: Account.Id[];
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = Record.genSchema('*accounts');
}
