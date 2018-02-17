import Dexie from 'dexie';
import { Account, Bank } from './records';

export type TableName = typeof Account.table
  | typeof Bank.table
  ;

export interface Change {
  readonly seq?: number;
  readonly text: string;
}

export class AppDatabase extends Dexie {
  static readonly tables: TableName[] = [
    Account.table,
    Bank.table,
  ];

  _changes: Dexie.Table<Change, string>;
  accounts: Dexie.Table<Account, string>;
  banks: Dexie.Table<Bank, string>;

  constructor (name: string) {
    super(name);
    this.version(1).stores({
      _changes: '++seq',
      ...Account.schema,
      ...Bank.schema,
    });
  }
}
