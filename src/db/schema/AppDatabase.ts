import Dexie from 'dexie';
import { AccountType, Split } from './schema-types';
import { Record } from '../../state/';

// export interface Account {
//   id: string;
//   name: string;
//   color: string;
//   type: AccountType;
//   number: string;
//   visible: boolean;
//   bankid: string;
//   key: string;
// }

// export namespace Account {
//   export const table = 'accounts';
//   export type Id = Account['id'];
//   export const schema = Record.genSchema();
// }

// export interface Bank {
//   id: string;
//   name: string;
//   web: string;
//   address: string;
//   notes: string;
//   favicon: string;
//   online: boolean;
//   fid: string;
//   org: string;
//   ofx: string;
//   username: string;
//   password: string;
//   accountIds: Account.Id[];
// }

// export namespace Bank {
//   export const table = 'banks';
//   export type Id = Bank['id'];
//   export const schema = Record.genSchema('*accounts');
// }

// export interface Bill {
//   id: string;
//   name: string;
//   group: string;
//   web: string;
//   favicon: string;
//   notes: string;
//   amount: number;
//   account: Account;
//   category: Category.Id;
//   rruleString: string;
//   showAdvanced: boolean;
// }

// export namespace Bill {
//   export const table = 'bills';
//   export type Id = Bill['id'];
//   export const schema = Record.genSchema('account', 'category');
// }

// export interface Budget {
//   id: string;
//   name: string;
//   categories: Category.Id[];
//   sortOrder: number;
// }

// export namespace Budget {
//   export const table = 'budgets';
//   export type Id = Budget['id'];
//   export const schema = Record.genSchema('*categories');
// }

// export interface Category {
//   id: string;
//   name: string;
//   amount: number;
// }

// export namespace Category {
//   export const table = 'categories';
//   export type Id = Category['id'];
//   export const schema = Record.genSchema();
// }

// export interface Transaction {
//   id: string;
//   account: Account;
//   serverid: string;
//   time: number;
//   type: string;
//   name: string;
//   memo: string;
//   amount: number;
//   split: Split[];
// }

// export namespace Transaction {
//   export const table = 'transactions';
//   export type Id = Transaction['id'];
//   export const schema = Record.genSchema();
// }

// export type TableName = typeof Account.table
//   | typeof Bank.table
//   | typeof Bill.table
//   | typeof Budget.table
//   | typeof Category.table
//   | typeof Transaction.table
//   ;

// export interface Change {
//   readonly seq?: number;
//   readonly text: string;
// }

// export class AppDatabase extends Dexie {
//   static readonly schemas = {
//     [Account.table]: Account.schema,
//     [Bank.table]: Bank.schema,
//     [Bill.table]: Bill.schema,
//     [Budget.table]: Budget.schema,
//     [Category.table]: Category.schema,
//     [Transaction.table]: Transaction.schema,
//   };
//   static readonly tables = Object.keys(AppDatabase.schemas) as TableName[];

//   _changes: Dexie.Table<Change, string>;
//   [Account.table]: Dexie.Table<Account, Account.Id>;
//   [Bank.table]: Dexie.Table<Bank, Bank.Id>;
//   [Bill.table]: Dexie.Table<Bill, Bill.Id>;
//   [Budget.table]: Dexie.Table<Budget, Budget.Id>;
//   [Category.table]: Dexie.Table<Category, Category.Id>;
//   [Transaction.table]: Dexie.Table<Transaction, Transaction.Id>;

//   static async open(name: string) {
//     const db = new AppDatabase(name);
//     await db.open();
//     return db;
//   }

//   constructor (name: string) {
//     super(name);
//     this.version(1).stores({
//       _changes: '++seq',
//       ...AppDatabase.schemas,
//     });
//   }
// }
