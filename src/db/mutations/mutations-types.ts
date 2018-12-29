/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

export interface Query {
  account: Account;
  bank: Bank;
  banks: Bank[];
  allDbs: DbInfo[];
  transaction: Transaction;
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
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  accountId: string;
  time: DateTime;
  account: string;
  serverid: string;
  type: string;
  name: string;
  memo: string;
  amount: number;
  balance: number;
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
  downloadAccountList: Bank;
  downloadTransactions: Account;
  cancel: boolean;
  saveBank: Bank;
  deleteBank: boolean;
  createDb: boolean;
  openDb: boolean;
  closeDb: boolean;
  deleteDb: string;
  saveTransaction: Transaction;
  deleteTransaction: Transaction;
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

export interface TransactionInput {
  account?: string | null;
  serverid?: string | null;
  time?: DateTime | null;
  type?: string | null;
  name?: string | null;
  memo?: string | null;
  amount?: number | null;
}
export interface AccountQueryArgs {
  accountId: string;
}
export interface BankQueryArgs {
  bankId: string;
}
export interface TransactionQueryArgs {
  transactionId: string;
}
export interface TransactionsAccountArgs {
  end?: DateTime | null;
  start?: DateTime | null;
}
export interface SaveAccountMutationArgs {
  bankId?: string | null;
  accountId?: string | null;
  input: AccountInput;
}
export interface DeleteAccountMutationArgs {
  accountId: string;
}
export interface DownloadAccountListMutationArgs {
  cancelToken: string;
  bankId: string;
}
export interface DownloadTransactionsMutationArgs {
  cancelToken: string;
  end: DateTime;
  start: DateTime;
  accountId: string;
  bankId: string;
}
export interface CancelMutationArgs {
  cancelToken: string;
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
export interface DeleteDbMutationArgs {
  dbId: string;
}
export interface SaveTransactionMutationArgs {
  accountId?: string | null;
  transactionId?: string | null;
  input: TransactionInput;
}
export interface DeleteTransactionMutationArgs {
  transactionId: string;
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  MONEYMRKT = "MONEYMRKT",
  CREDITLINE = "CREDITLINE",
  CREDITCARD = "CREDITCARD"
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    account?: AccountResolver<Account, any, Context>;
    bank?: BankResolver<Bank, any, Context>;
    banks?: BanksResolver<Bank[], any, Context>;
    allDbs?: AllDbsResolver<DbInfo[], any, Context>;
    transaction?: TransactionResolver<Transaction, any, Context>;
  }

  export type AccountResolver<
    R = Account,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AccountArgs>;
  export interface AccountArgs {
    accountId: string;
  }

  export type BankResolver<R = Bank, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    BankArgs
  >;
  export interface BankArgs {
    bankId: string;
  }

  export type BanksResolver<R = Bank[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AllDbsResolver<
    R = DbInfo[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TransactionResolver<
    R = Transaction,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, TransactionArgs>;
  export interface TransactionArgs {
    transactionId: string;
  }
}

export namespace AccountResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    bankId?: BankIdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    color?: ColorResolver<string, any, Context>;
    type?: TypeResolver<AccountType, any, Context>;
    number?: NumberResolver<string, any, Context>;
    visible?: VisibleResolver<boolean, any, Context>;
    routing?: RoutingResolver<string, any, Context>;
    key?: KeyResolver<string, any, Context>;
    transactions?: TransactionsResolver<Transaction[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type BankIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ColorResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = AccountType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NumberResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VisibleResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RoutingResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type KeyResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TransactionsResolver<
    R = Transaction[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, TransactionsArgs>;
  export interface TransactionsArgs {
    end?: DateTime | null;
    start?: DateTime | null;
  }
}

export namespace TransactionResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    accountId?: AccountIdResolver<string, any, Context>;
    time?: TimeResolver<DateTime, any, Context>;
    account?: AccountResolver<string, any, Context>;
    serverid?: ServeridResolver<string, any, Context>;
    type?: TypeResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    memo?: MemoResolver<string, any, Context>;
    amount?: AmountResolver<number, any, Context>;
    balance?: BalanceResolver<number, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AccountIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TimeResolver<
    R = DateTime,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AccountResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ServeridResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MemoResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AmountResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BalanceResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace BankResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    web?: WebResolver<string, any, Context>;
    address?: AddressResolver<string, any, Context>;
    notes?: NotesResolver<string, any, Context>;
    favicon?: FaviconResolver<string, any, Context>;
    online?: OnlineResolver<boolean, any, Context>;
    fid?: FidResolver<string, any, Context>;
    org?: OrgResolver<string, any, Context>;
    ofx?: OfxResolver<string, any, Context>;
    username?: UsernameResolver<string, any, Context>;
    password?: PasswordResolver<string, any, Context>;
    accounts?: AccountsResolver<Account[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type WebResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AddressResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NotesResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FaviconResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type OnlineResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FidResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OrgResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OfxResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsernameResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PasswordResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AccountsResolver<
    R = Account[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace DbInfoResolvers {
  export interface Resolvers<Context = any> {
    dbId?: DbIdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
  }

  export type DbIdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    saveAccount?: SaveAccountResolver<Account, any, Context>;
    deleteAccount?: DeleteAccountResolver<boolean, any, Context>;
    downloadAccountList?: DownloadAccountListResolver<Bank, any, Context>;
    downloadTransactions?: DownloadTransactionsResolver<Account, any, Context>;
    cancel?: CancelResolver<boolean, any, Context>;
    saveBank?: SaveBankResolver<Bank, any, Context>;
    deleteBank?: DeleteBankResolver<boolean, any, Context>;
    createDb?: CreateDbResolver<boolean, any, Context>;
    openDb?: OpenDbResolver<boolean, any, Context>;
    closeDb?: CloseDbResolver<boolean, any, Context>;
    deleteDb?: DeleteDbResolver<string, any, Context>;
    saveTransaction?: SaveTransactionResolver<Transaction, any, Context>;
    deleteTransaction?: DeleteTransactionResolver<Transaction, any, Context>;
  }

  export type SaveAccountResolver<
    R = Account,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SaveAccountArgs>;
  export interface SaveAccountArgs {
    bankId?: string | null;
    accountId?: string | null;
    input: AccountInput;
  }

  export type DeleteAccountResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteAccountArgs>;
  export interface DeleteAccountArgs {
    accountId: string;
  }

  export type DownloadAccountListResolver<
    R = Bank,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DownloadAccountListArgs>;
  export interface DownloadAccountListArgs {
    cancelToken: string;
    bankId: string;
  }

  export type DownloadTransactionsResolver<
    R = Account,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DownloadTransactionsArgs>;
  export interface DownloadTransactionsArgs {
    cancelToken: string;
    end: DateTime;
    start: DateTime;
    accountId: string;
    bankId: string;
  }

  export type CancelResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CancelArgs>;
  export interface CancelArgs {
    cancelToken: string;
  }

  export type SaveBankResolver<
    R = Bank,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SaveBankArgs>;
  export interface SaveBankArgs {
    bankId?: string | null;
    input: BankInput;
  }

  export type DeleteBankResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteBankArgs>;
  export interface DeleteBankArgs {
    bankId: string;
  }

  export type CreateDbResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateDbArgs>;
  export interface CreateDbArgs {
    password: string /** the password for the database */;
    name: string;
  }

  export type OpenDbResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, OpenDbArgs>;
  export interface OpenDbArgs {
    password: string /** the password for the database */;
    dbId: string;
  }

  export type CloseDbResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DeleteDbResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteDbArgs>;
  export interface DeleteDbArgs {
    dbId: string;
  }

  export type SaveTransactionResolver<
    R = Transaction,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SaveTransactionArgs>;
  export interface SaveTransactionArgs {
    accountId?: string | null;
    transactionId?: string | null;
    input: TransactionInput;
  }

  export type DeleteTransactionResolver<
    R = Transaction,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteTransactionArgs>;
  export interface DeleteTransactionArgs {
    transactionId: string;
  }
}

export namespace BillResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    group?: GroupResolver<string, any, Context>;
    web?: WebResolver<string, any, Context>;
    favicon?: FaviconResolver<string, any, Context>;
    notes?: NotesResolver<string, any, Context>;
    amount?: AmountResolver<number, any, Context>;
    account?: AccountResolver<string, any, Context>;
    category?: CategoryResolver<string, any, Context>;
    rruleString?: RruleStringResolver<string, any, Context>;
    showAdvanced?: ShowAdvancedResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GroupResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type WebResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FaviconResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NotesResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AmountResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AccountResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CategoryResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RruleStringResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ShowAdvancedResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace BudgetResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    sortOrder?: SortOrderResolver<number, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SortOrderResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace CategoryResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    amount?: AmountResolver<number, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AmountResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
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

export namespace CloseDb {
  export type Variables = {};

  export type Mutation = {
    __typename?: "Mutation";
    closeDb: boolean;
  };
}

export namespace DeleteDb {
  export type Variables = {
    dbId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteDb: string;
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

export namespace DeleteBank {
  export type Variables = {
    bankId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteBank: boolean;
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

export namespace DownloadAccountList {
  export type Variables = {
    bankId: string;
    cancelToken: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    downloadAccountList: DownloadAccountList;
  };

  export type DownloadAccountList = {
    __typename?: "Bank";
    id: string;
    accounts: Accounts[];
  };

  export type Accounts = {
    __typename?: "Account";
    id: string;
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

export namespace SaveTransaction {
  export type Variables = {
    input: TransactionInput;
    transactionId?: string | null;
    accountId?: string | null;
  };

  export type Mutation = {
    __typename?: "Mutation";
    saveTransaction: SaveTransaction;
  };

  export type SaveTransaction = {
    __typename?: "Transaction";
    id: string;
    accountId: string;
  };
}

export namespace DeleteTransaction {
  export type Variables = {
    transactionId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    deleteTransaction: DeleteTransaction;
  };

  export type DeleteTransaction = {
    __typename?: "Transaction";
    accountId: string;
  };
}

export namespace DownloadTransactions {
  export type Variables = {
    bankId: string;
    accountId: string;
    start: DateTime;
    end: DateTime;
    cancelToken: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    downloadTransactions: DownloadTransactions;
  };

  export type DownloadTransactions = {
    __typename?: "Account";
    id: string;
  };
}

export namespace Cancel {
  export type Variables = {
    cancelToken: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    cancel: boolean;
  };
}
