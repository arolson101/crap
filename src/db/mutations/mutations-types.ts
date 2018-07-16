/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

/** Cancellation token */
export type CancelToken = any;

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
  getAccountList: Bank;
  createDb: boolean;
  openDb: boolean;
  closeDb: boolean;
  deleteDb: boolean;
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
export interface GetAccountListMutationArgs {
  cancelToken: CancelToken;
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
export interface DeleteDbMutationArgs {
  dbId: string;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}

export namespace QueryResolvers {
  export interface Resolvers {
    account?: AccountResolver;
    bank?: BankResolver;
    banks?: BanksResolver;
    allDbs?: AllDbsResolver;
  }

  export type AccountResolver = Resolver<Account, AccountArgs>;
  export interface AccountArgs {
    accountId: string;
  }

  export type BankResolver = Resolver<Bank, BankArgs>;
  export interface BankArgs {
    bankId: string;
  }

  export type BanksResolver = Resolver<Bank[]>;
  export type AllDbsResolver = Resolver<DbInfo[]>;
}
export namespace AccountResolvers {
  export interface Resolvers {
    id?: IdResolver;
    bankId?: BankIdResolver;
    name?: NameResolver;
    color?: ColorResolver;
    type?: TypeResolver;
    number?: NumberResolver;
    visible?: VisibleResolver;
    routing?: RoutingResolver;
    key?: KeyResolver;
  }

  export type IdResolver = Resolver<string>;
  export type BankIdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type ColorResolver = Resolver<string>;
  export type TypeResolver = Resolver<AccountType>;
  export type NumberResolver = Resolver<string>;
  export type VisibleResolver = Resolver<boolean>;
  export type RoutingResolver = Resolver<string>;
  export type KeyResolver = Resolver<string>;
}
export namespace BankResolvers {
  export interface Resolvers {
    id?: IdResolver;
    name?: NameResolver;
    web?: WebResolver;
    address?: AddressResolver;
    notes?: NotesResolver;
    favicon?: FaviconResolver;
    online?: OnlineResolver;
    fid?: FidResolver;
    org?: OrgResolver;
    ofx?: OfxResolver;
    username?: UsernameResolver;
    password?: PasswordResolver;
    accounts?: AccountsResolver;
  }

  export type IdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type WebResolver = Resolver<string>;
  export type AddressResolver = Resolver<string>;
  export type NotesResolver = Resolver<string>;
  export type FaviconResolver = Resolver<string>;
  export type OnlineResolver = Resolver<boolean>;
  export type FidResolver = Resolver<string>;
  export type OrgResolver = Resolver<string>;
  export type OfxResolver = Resolver<string>;
  export type UsernameResolver = Resolver<string>;
  export type PasswordResolver = Resolver<string>;
  export type AccountsResolver = Resolver<Account[]>;
}
export namespace DbInfoResolvers {
  export interface Resolvers {
    dbId?: DbIdResolver;
    name?: NameResolver;
  }

  export type DbIdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
}
export namespace MutationResolvers {
  export interface Resolvers {
    saveAccount?: SaveAccountResolver;
    deleteAccount?: DeleteAccountResolver;
    saveBank?: SaveBankResolver;
    deleteBank?: DeleteBankResolver;
    getAccountList?: GetAccountListResolver;
    createDb?: CreateDbResolver;
    openDb?: OpenDbResolver;
    closeDb?: CloseDbResolver;
    deleteDb?: DeleteDbResolver;
  }

  export type SaveAccountResolver = Resolver<Account, SaveAccountArgs>;
  export interface SaveAccountArgs {
    bankId?: string | null;
    accountId?: string | null;
    input: AccountInput;
  }

  export type DeleteAccountResolver = Resolver<boolean, DeleteAccountArgs>;
  export interface DeleteAccountArgs {
    accountId: string;
  }

  export type SaveBankResolver = Resolver<Bank, SaveBankArgs>;
  export interface SaveBankArgs {
    bankId?: string | null;
    input: BankInput;
  }

  export type DeleteBankResolver = Resolver<boolean, DeleteBankArgs>;
  export interface DeleteBankArgs {
    bankId: string;
  }

  export type GetAccountListResolver = Resolver<Bank, GetAccountListArgs>;
  export interface GetAccountListArgs {
    cancelToken: CancelToken;
    bankId: string;
  }

  export type CreateDbResolver = Resolver<boolean, CreateDbArgs>;
  export interface CreateDbArgs {
    password: string /** the password for the database */;
    name: string;
  }

  export type OpenDbResolver = Resolver<boolean, OpenDbArgs>;
  export interface OpenDbArgs {
    password: string /** the password for the database */;
    dbId: string;
  }

  export type CloseDbResolver = Resolver<boolean>;
  export type DeleteDbResolver = Resolver<boolean, DeleteDbArgs>;
  export interface DeleteDbArgs {
    dbId: string;
  }
}
export namespace BillResolvers {
  export interface Resolvers {
    id?: IdResolver;
    name?: NameResolver;
    group?: GroupResolver;
    web?: WebResolver;
    favicon?: FaviconResolver;
    notes?: NotesResolver;
    amount?: AmountResolver;
    account?: AccountResolver;
    category?: CategoryResolver;
    rruleString?: RruleStringResolver;
    showAdvanced?: ShowAdvancedResolver;
  }

  export type IdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type GroupResolver = Resolver<string>;
  export type WebResolver = Resolver<string>;
  export type FaviconResolver = Resolver<string>;
  export type NotesResolver = Resolver<string>;
  export type AmountResolver = Resolver<number>;
  export type AccountResolver = Resolver<string>;
  export type CategoryResolver = Resolver<string>;
  export type RruleStringResolver = Resolver<string>;
  export type ShowAdvancedResolver = Resolver<boolean>;
}
export namespace BudgetResolvers {
  export interface Resolvers {
    id?: IdResolver;
    name?: NameResolver;
    sortOrder?: SortOrderResolver;
  }

  export type IdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type SortOrderResolver = Resolver<number>;
}
export namespace CategoryResolvers {
  export interface Resolvers {
    id?: IdResolver;
    name?: NameResolver;
    amount?: AmountResolver;
  }

  export type IdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type AmountResolver = Resolver<number>;
}
export namespace TransactionResolvers {
  export interface Resolvers {
    id?: IdResolver;
    account?: AccountResolver;
    serverid?: ServeridResolver;
    time?: TimeResolver;
    type?: TypeResolver;
    name?: NameResolver;
    memo?: MemoResolver;
    amount?: AmountResolver;
  }

  export type IdResolver = Resolver<string>;
  export type AccountResolver = Resolver<string>;
  export type ServeridResolver = Resolver<string>;
  export type TimeResolver = Resolver<number>;
  export type TypeResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type MemoResolver = Resolver<string>;
  export type AmountResolver = Resolver<number>;
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
export namespace DeleteDb {
  export type Variables = {
    dbId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteDb: boolean;
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
    name: string;
    bankId: string;
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
    name: string;
  };
}
export namespace GetAccountList {
  export type Variables = {
    bankId: string;
    cancelToken: CancelToken;
  };

  export type Mutation = {
    __typename?: "Mutation";
    getAccountList: GetAccountList;
  };

  export type GetAccountList = {
    __typename?: "Bank";
    id: string;
    accounts: Accounts[];
  };

  export type Accounts = {
    __typename?: "Account";
    id: string;
  };
}
