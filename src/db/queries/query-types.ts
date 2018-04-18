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
    bankid: string,
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

export interface AllCoursesQuery {
  allCourses:  Array< {
    title: string,
  } | null >,
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

export interface CourseQueryVariables {
  id: number,
};

export interface CourseQuery {
  course:  {
    id: number,
    title: string,
    author: string,
    description: string,
    topic: string,
    url: string,
  } | null,
};

export interface DbsQuery {
  dbs: Array< string >,
};
