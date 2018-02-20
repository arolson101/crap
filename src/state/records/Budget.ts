import * as update from 'immutability-helper';
import { Record } from '../Record';
import { Category } from './Category';

export interface Budget extends Budget.Props, Record<Budget.Id, Budget.Props> {}

export namespace Budget {
  export type Id = ':budgetId';

  export interface Props {
    readonly name: string;
    readonly categories: Category.Id[];
    readonly sortOrder: number;
  }

  export type Query = update.Query<Props>;
  export const table = 'budgets';
  export const schema = Record.genSchema('*categories');
}
