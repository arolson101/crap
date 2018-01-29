import * as update from 'immutability-helper';
import { Record } from '../Record';

export interface Bank extends Bank.Props, Record<Bank.Props> {}

export namespace Bank {
  export interface Props {
    readonly name: string;
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = { [table]: Record.genSchema('name') };
}
