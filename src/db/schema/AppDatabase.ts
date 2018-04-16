import Dexie from 'dexie';
import { Account, Bank, Bill, Budget, Category, Transaction } from './schema-types';
import { Record } from '../../state/';

namespace Account {
  export const table = 'accounts';
  export type Id = Account['id'];
  export const schema = Record.genSchema();
}

namespace Bank {
  export const table = 'banks';
  export type Id = Bank['id'];
  export const schema = Record.genSchema('*accounts');
}

namespace Bill {
  export const table = 'bills';
  export type Id = Bill['id'];
  export const schema = Record.genSchema('account', 'category');
}

namespace Budget {
  export const table = 'budgets';
  export type Id = Budget['id'];
  export const schema = Record.genSchema('*categories');
}

namespace Category {
  export const table = 'categories';
  export type Id = Category['id'];
  export const schema = Record.genSchema();
}

namespace Transaction {
  export const table = 'transactions';
  export type Id = Transaction['id'];
  export const schema = Record.genSchema();
}

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

  static async open(name: string) {
    const db = new AppDatabase(name);
    await db.open();
    return db;
  }

  constructor (name: string) {
    super(name);
    this.version(1).stores({
      _changes: '++seq',
      ...AppDatabase.schemas,
    });
  }
}
