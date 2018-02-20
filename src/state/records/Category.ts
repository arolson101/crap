import * as update from 'immutability-helper';
import { Record } from '../Record';

export interface Category extends Category.Props, Record<Category.Id, Category.Props> {}

export namespace Category {
  export type Id = ':categoryId';

  export interface Props {
    name: string;
    amount: number;
  }

  export type Query = update.Query<Props>;
  export const table = 'categories';
  export const schema = Record.genSchema();
}
