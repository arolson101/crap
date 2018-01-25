import * as update from 'immutability-helper';
import { Node } from './Node';

export interface Bank extends Bank.Props, Node<Bank.Props> {}

export namespace Bank {
  export interface Props {
    readonly name: string;
  }

  export type Query = update.Query<Props>;
  export const table = 'banks';
  export const schema = { [table]: '&id, name' };
}
