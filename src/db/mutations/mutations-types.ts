/* tslint:disable */

export interface Query {
  account: Account;
  bank: Bank;
  banks: Bank[];
  allDbs: DbInfo[];
}

export interface Account {
  id: string;
  bankId: string;
  name: string;
  color: string;
  type: AccountType;
  number: string;
  visible: boolean;
  routing: string;
  key: string;
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

export interface DbInfo {
  dbId: string;
  name: string;
}

export interface Mutation {
  saveAccount: Account;
  deleteAccount: boolean;
  saveBank: Bank;
  deleteBank: boolean;
  createDb: boolean;
  openDb: boolean;
  closeDb: boolean;
}

export interface Bill {
  id: string;
  name: string;
  group: string;
  web: string;
  favicon: string;
  notes: string;
  amount: number;
  account: string;
  category: string;
  rruleString: string;
  showAdvanced: boolean;
}

export interface Budget {
  id: string;
  name: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  account: string;
  serverid: string;
  time: number;
  type: string;
  name: string;
  memo: string;
  amount: number;
}

export interface AccountInput {
  name?: string | null;
  color?: string | null;
  type?: AccountType | null;
  number?: string | null;
  visible?: boolean | null;
  routing?: string | null;
  key?: string | null;
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
export interface AccountQueryArgs {
  accountId: string;
}
export interface BankQueryArgs {
  bankId: string;
}
export interface SaveAccountMutationArgs {
  bankId?: string | null;
  accountId?: string | null;
  input: AccountInput;
}
export interface DeleteAccountMutationArgs {
  accountId: string;
}
export interface SaveBankMutationArgs {
  bankId?: string | null;
  input: BankInput;
}
export interface DeleteBankMutationArgs {
  bankId: string;
}
export interface CreateDbMutationArgs {
  password: string /** the password for the database */;
  name: string;
}
export interface OpenDbMutationArgs {
  password: string /** the password for the database */;
  dbId: string;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}
export namespace DeleteBank {
  export type Variables = {
    bankId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteBank: boolean;
  };
}
export namespace DeleteAccount {
  export type Variables = {
    accountId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteAccount: boolean;
  };
}
export namespace CreateDb {
  export type Variables = {
    name: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    createDb: boolean;
  };
}
export namespace OpenDb {
  export type Variables = {
    dbId: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    openDb: boolean;
  };
}
export namespace SaveAccount {
  export type Variables = {
    input: AccountInput;
    accountId?: string | null;
    bankId?: string | null;
  };

  export type Mutation = {
    __typename?: "Mutation";
    saveAccount: SaveAccount;
  };

  export type SaveAccount = {
    __typename?: "Account";
    id: string;
  };
}
export namespace SaveBank {
  export type Variables = {
    input: BankInput;
    bankId?: string | null;
  };

  export type Mutation = {
    __typename?: "Mutation";
    saveBank: SaveBank;
  };

  export type SaveBank = {
    __typename?: "Bank";
    id: string;
  };
}
