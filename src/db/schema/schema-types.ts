/* tslint:disable */

export interface Query {
  dbs: string[];
  allCourses: Course[];
  course?: Course | null;
  bank: Bank;
  banks: Bank[];
  account: Account;
}

export interface Course {
  id: number;
  title: string;
  author: string;
  description: string;
  topic: string;
  url: string;
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
  type: AccountType;
  number: string;
  visible: boolean;
  bankid: string;
  key: string;
}

export interface Mutation {
  openDb: boolean;
  closeDb: boolean;
  saveBank?: Bank | null;
  deleteBank: boolean;
  saveAccount?: Account | null;
  deleteAccount: boolean;
}

export interface Split {
  category?: Category | null;
  amount?: number | null;
}

export interface Category {
  id: string;
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  account: Account;
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
  type?: AccountType | null;
  number?: string | null;
  visible?: boolean | null;
  bankid?: string | null;
  key?: string | null;
}

export interface DbInput {
  name: string;
  password: string;
}
export interface CourseQueryArgs {
  id: number;
}
export interface BankQueryArgs {
  bankId: string;
}
export interface AccountQueryArgs {
  accountId: string;
}
export interface OpenDbMutationArgs {
  name: string;
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
  bankId: string;
  accountId: string;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}
