/* tslint:disable */

export interface Query {
  dbs: string[];
  allCourses: Course[];
  course?: Course | null;
  bank?: Bank | null;
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
  accounts: Account[];
}

export interface Account {
  id: string;
  name?: string | null;
  color?: string | null;
  type?: AccountType | null;
  number?: string | null;
  visible?: boolean | null;
  bankid?: string | null;
  key?: string | null;
}

export interface Mutation {
  openDb?: boolean | null;
  closeDb?: boolean | null;
  createAccountInBank?: Account | null;
  updateAccount?: Account | null;
  deleteAccount?: boolean | null;
}

export interface Split {
  category?: Category | null;
  amount?: number | null;
}

export interface Category {
  id: string;
  name?: string | null;
  amount?: number | null;
}

export interface Transaction {
  id: string;
  account: Account;
  serverid?: string | null;
  time?: number | null;
  type?: string | null;
  name?: string | null;
  memo?: string | null;
  amount?: number | null;
  split: Split[];
}

export interface Bill {
  id: string;
  name: string;
  group?: string | null;
  web?: string | null;
  favicon?: string | null;
  notes?: string | null;
  amount?: number | null;
  account?: Account | null;
  category?: Category | null;
  rruleString?: string | null;
  showAdvanced?: boolean | null;
}

export interface Budget {
  id: string;
  name?: string | null;
  categories: Category[];
  sortOrder?: number | null;
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

export interface BankInput {
  name: string;
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
export interface CreateAccountInBankMutationArgs {
  bankId: string;
  input?: AccountInput | null;
}
export interface UpdateAccountMutationArgs {
  accountId: string;
  input?: AccountInput | null;
}
export interface DeleteAccountMutationArgs {
  accountId: string;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}
