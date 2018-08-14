/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

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
  export interface Resolvers {
    account?: AccountResolver;
    bank?: BankResolver;
    banks?: BanksResolver;
    allDbs?: AllDbsResolver;
    transaction?: TransactionResolver;
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
  export type TransactionResolver = Resolver<Transaction, TransactionArgs>;
  export interface TransactionArgs {
    transactionId: string;
  }
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
    transactions?: TransactionsResolver;
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
  export type TransactionsResolver = Resolver<Transaction[], TransactionsArgs>;
  export interface TransactionsArgs {
    end?: DateTime | null;
    start?: DateTime | null;
  }
}
export namespace TransactionResolvers {
  export interface Resolvers {
    id?: IdResolver;
    accountId?: AccountIdResolver;
    time?: TimeResolver;
    account?: AccountResolver;
    serverid?: ServeridResolver;
    type?: TypeResolver;
    name?: NameResolver;
    memo?: MemoResolver;
    amount?: AmountResolver;
    balance?: BalanceResolver;
  }

  export type IdResolver = Resolver<string>;
  export type AccountIdResolver = Resolver<string>;
  export type TimeResolver = Resolver<DateTime>;
  export type AccountResolver = Resolver<string>;
  export type ServeridResolver = Resolver<string>;
  export type TypeResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
  export type MemoResolver = Resolver<string>;
  export type AmountResolver = Resolver<number>;
  export type BalanceResolver = Resolver<number>;
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
    downloadAccountList?: DownloadAccountListResolver;
    downloadTransactions?: DownloadTransactionsResolver;
    cancel?: CancelResolver;
    saveBank?: SaveBankResolver;
    deleteBank?: DeleteBankResolver;
    createDb?: CreateDbResolver;
    openDb?: OpenDbResolver;
    closeDb?: CloseDbResolver;
    deleteDb?: DeleteDbResolver;
    saveTransaction?: SaveTransactionResolver;
    deleteTransaction?: DeleteTransactionResolver;
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

  export type DownloadAccountListResolver = Resolver<
    Bank,
    DownloadAccountListArgs
  >;
  export interface DownloadAccountListArgs {
    cancelToken: string;
    bankId: string;
  }

  export type DownloadTransactionsResolver = Resolver<
    Account,
    DownloadTransactionsArgs
  >;
  export interface DownloadTransactionsArgs {
    cancelToken: string;
    end: DateTime;
    start: DateTime;
    accountId: string;
    bankId: string;
  }

  export type CancelResolver = Resolver<boolean, CancelArgs>;
  export interface CancelArgs {
    cancelToken: string;
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
  export type DeleteDbResolver = Resolver<string, DeleteDbArgs>;
  export interface DeleteDbArgs {
    dbId: string;
  }

  export type SaveTransactionResolver = Resolver<
    Transaction,
    SaveTransactionArgs
  >;
  export interface SaveTransactionArgs {
    accountId?: string | null;
    transactionId?: string | null;
    input: TransactionInput;
  }

  export type DeleteTransactionResolver = Resolver<
    Transaction,
    DeleteTransactionArgs
  >;
  export interface DeleteTransactionArgs {
    transactionId: string;
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
    transactionId?: string | null;
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
