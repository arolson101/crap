/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface AccountInput {
  name?: string | null,
  color?: string | null,
  routing?: string | null,
  type?: AccountType | null,
  number?: string | null,
  visible?: boolean | null,
  key?: string | null,
};

export enum AccountType {
  CHECKING = "CHECKING",
  CREDITCARD = "CREDITCARD",
  CREDITLINE = "CREDITLINE",
  MONEYMRKT = "MONEYMRKT",
  SAVINGS = "SAVINGS",
}


export interface BankInput {
  name?: string | null,
  web?: string | null,
  address?: string | null,
  notes?: string | null,
  favicon?: string | null,
  online?: boolean | null,
  fid?: string | null,
  org?: string | null,
  ofx?: string | null,
  username?: string | null,
  password?: string | null,
};

export interface DeleteBankMutationVariables {
  bankId: string,
};

export interface DeleteBankMutation {
  deleteBank: boolean,
};

export interface OpenDbMutationVariables {
  name: string,
  password: string,
};

export interface OpenDbMutation {
  openDb: boolean,
};

export interface SaveAccountMutationVariables {
  input: AccountInput,
  accountId?: string | null,
  bankId?: string | null,
};

export interface SaveAccountMutation {
  saveAccount:  {
    id: string,
  } | null,
};

export interface SaveBankMutationVariables {
  input: BankInput,
  bankId?: string | null,
};

export interface SaveBankMutation {
  saveBank:  {
    id: string,
  } | null,
};
