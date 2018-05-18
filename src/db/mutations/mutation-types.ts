/* tslint:disable */

export interface Query {
  db: Db;
  bank: Bank;
  banks: Bank[];
  account: Account;
}

export interface Db {
  all: string[];
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
  bankId: string;
  name: string;
  color: string;
  type: string;
  number: string;
  visible: boolean;
  routing: string;
  key: string;
}

export interface Mutation {
  openDb: boolean;
  closeDb: boolean;
  saveBank: Bank;
  deleteBank: boolean;
  saveAccount: Account;
  deleteAccount: boolean;
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
  type?: string | null;
  number?: string | null;
  visible?: boolean | null;
  routing?: string | null;
  key?: string | null;
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
  accountId?: string | null;
  bankId?: string | null;
  input: AccountInput;
}
export interface DeleteAccountMutationArgs {
  accountId: string;
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
export namespace OpenDb {
  export type Variables = {
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
