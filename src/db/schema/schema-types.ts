/* tslint:disable */

export interface Query {
  dbs: string[];
  bank: Bank;
  banks: Bank[];
  account: Account;
}

export interface Bank {
  id: string;
  name: string;
  web: string;
  address: string;
  notes: string;
  favicon: string;
  online: boolean;
  fid: string;
  org: string;
  ofx: string;
  username: string;
  password: string;
  accounts: Account[];
}

export interface Account {
  id: string;
  name: string;
  color: string;
  routing: string;
  type: AccountType;
  number: string;
  visible: boolean;
  key: string;
}

export interface Mutation {
  openDb: boolean;
  closeDb: boolean;
  saveBank?: Bank | null;
  deleteBank: boolean;
  saveAccount?: Account | null;
  deleteAccount: boolean;
  downloadTransactions: boolean;
}

export interface Split {
  category?: Category | null;
  amount?: number | null;
}

export interface Category {
  id: string;
  budgetId: string;
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  serverid: string;
  time: number;
  type: string;
  name: string;
  memo: string;
  amount: number;
  split: Split[];
}

export interface Bill {
  id: string;
  name: string;
  group: string;
  web: string;
  favicon: string;
  notes: string;
  amount: number;
  account: Account;
  category: Category;
  rruleString: string;
  showAdvanced: boolean;
}

export interface Budget {
  id: string;
  name: string;
  categories: Category[];
  sortOrder: number;
}

export interface BankInput {
  name?: string | null;
  web?: string | null;
  address?: string | null;
  notes?: string | null;
  favicon?: string | null;
  online?: boolean | null;
  fid?: string | null;
  org?: string | null;
  ofx?: string | null;
  username?: string | null;
  password?: string | null;
}

export interface AccountInput {
  name?: string | null;
  color?: string | null;
  routing?: string | null;
  type?: AccountType | null;
  number?: string | null;
  visible?: boolean | null;
  key?: string | null;
}

export interface DbInput {
  name: string;
  password: string;
}
export interface BankQueryArgs {
  bankId: string;
}
export interface AccountQueryArgs {
  accountId: string;
}
export interface OpenDbMutationArgs {
  password: string;
}
export interface SaveBankMutationArgs {
  input: BankInput;
  bankId?: string | null;
}
export interface DeleteBankMutationArgs {
  bankId: string;
}
export interface SaveAccountMutationArgs {
  input: AccountInput;
  accountId?: string | null;
  bankId?: string | null;
}
export interface DeleteAccountMutationArgs {
  accountId: string;
}
export interface DownloadTransactionsMutationArgs {
  bankId?: string | null;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}
