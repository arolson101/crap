import Dexie from 'dexie';
import { Account, Bank, Bill, Budget, Category, Transaction } from './records';

export type TableName = typeof Account.table
  | typeof Bank.table
  | typeof Bill.table
  | typeof Budget.table
  | typeof Category.table
  | typeof Transaction.table
  ;

export interface Change {
  readonly seq?: number;
  readonly text: string;
}

export class AppDatabase extends Dexie {
  static readonly schemas = {
    [Account.table]: Account.schema,
    [Bank.table]: Bank.schema,
    [Bill.table]: Bill.schema,
    [Budget.table]: Budget.schema,
    [Category.table]: Category.schema,
    [Transaction.table]: Transaction.schema,
  };
  static readonly tables = Object.keys(AppDatabase.schemas) as TableName[];

  _changes: Dexie.Table<Change, string>;
  [Account.table]: Dexie.Table<Account, Account.Id>;
  [Bank.table]: Dexie.Table<Bank, Bank.Id>;
  [Bill.table]: Dexie.Table<Bill, Bill.Id>;
  [Budget.table]: Dexie.Table<Budget, Budget.Id>;
  [Category.table]: Dexie.Table<Category, Category.Id>;
  [Transaction.table]: Dexie.Table<Transaction, Transaction.Id>;

  constructor (name: string) {
    super(name);
    this.version(1).stores({
      _changes: '++seq',
      ...AppDatabase.schemas,
    });
  }
}
