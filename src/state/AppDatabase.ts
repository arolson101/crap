import Dexie from 'dexie';
import { Bank } from './docs';

export type TableName = typeof Bank.table;

export interface Change {
  readonly seq?: number;
  readonly text: string;
}

export class AppDatabase extends Dexie {
  static readonly tables: TableName[] = [
    Bank.table
  ];

  _changes: Dexie.Table<Change, string>;
  banks: Dexie.Table<Bank, string>;

  constructor (name: string) {
    super(name);
    this.version(1).stores({
      _changes: '++seq',
      ...Bank.schema,
    });
  }
}
