import * as update from 'immutability-helper';
import { Record } from '../Record';

export interface Bank extends Bank.Props, Record<Bank.Props> {}

export namespace Bank {
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

    readonly login?: {
      readonly username: string
      readonly password: string
    };

    readonly accounts: string[];
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = { [table]: Record.genSchema() };
}
