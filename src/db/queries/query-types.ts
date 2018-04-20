/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum AccountType {
  CHECKING = "CHECKING",
  CREDITCARD = "CREDITCARD",
  CREDITLINE = "CREDITLINE",
  MONEYMRKT = "MONEYMRKT",
  SAVINGS = "SAVINGS",
}


export interface AccountQueryVariables {
  accountId: string,
};

export interface AccountQuery {
  account:  {
    id: string,
    name: string,
    type: AccountType,
    color: string,
    number: string,
    visible: boolean,
    routing: string,
    key: string,
  },
};

export interface AccountsQuery {
  banks:  Array< {
    id: string,
    name: string,
    accounts:  Array< {
      id: string,
      name: string,
    } >,
  } >,
};

export interface BankQueryVariables {
  bankId: string,
};

export interface BankQuery {
  bank:  {
    id: string,
    name: string,
    web: string,
    address: string,
    notes: string,
    favicon: string,
    online: boolean,
    fid: string,
    org: string,
    ofx: string,
    username: string,
    password: string,
    accounts:  Array< {
      id: string,
      name: string,
    } >,
  },
};

export interface BanksQuery {
  banks:  Array< {
    id: string,
    name: string,
    accounts:  Array< {
      id: string,
      name: string,
    } >,
  } >,
};

export interface DbsQuery {
  dbs: Array< string >,
};
