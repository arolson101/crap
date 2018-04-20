import * as ST from './schema-types';
import { IResolvers } from 'graphql-tools';
import Dexie from 'dexie';
import { iupdate } from '../../iupdate';
import { AppDatabase } from '../AppDatabase';
import { createRecord } from '../Record';
import { Account, Bank } from '../records';
import { ResolverContext } from './';

// see GraphQLTypeResolver
type Resolver<TRet, TArgs = {}> =
  (source: {}, args: TArgs, context: ResolverContext) => Partial<TRet> | Promise<Partial<TRet>>;

interface Resolvers extends IResolvers<{}, ResolverContext> {
  Query: {
    dbs: Resolver<ST.Query['dbs']>;
    bank: Resolver<ST.Query['bank'], ST.BankQueryArgs>;
    banks: Resolver<Partial<ST.Bank>[]/*ST.Query['banks']*/>;
    account: Resolver<ST.Query['account'], ST.AccountQueryArgs>;
  };
  Mutation: {
    openDb: Resolver<ST.Mutation['openDb'], ST.OpenDbMutationArgs>;
    closeDb: Resolver<ST.Mutation['closeDb']>;
    saveBank: Resolver<ST.Mutation['saveBank'], ST.SaveBankMutationArgs>;
    deleteBank: Resolver<ST.Mutation['deleteBank'], ST.DeleteBankMutationArgs>;
    saveAccount: Resolver<ST.Mutation['saveAccount'], ST.SaveAccountMutationArgs>;
    deleteAccount: Resolver<ST.Mutation['deleteAccount'], ST.DeleteAccountMutationArgs>;
  };
}

const getDb = (context: ResolverContext) => {
  const db = context.db;
  if (!db) {
    throw new Error('db not open');
  }
  return db;
};

const getBank = async (db: AppDatabase, id: Bank.Id | string): Promise<Bank> => {
  const bank = await db.banks.where({ id, _deleted: 0 }).first();
  if (!bank) {
    throw new Error(`bank ${id} not found`);
  }
  return bank;
};

const toBank = (dbBank: Bank): Partial<ST.Bank> => {
  const { _deleted, _base, _history, ...rest } = dbBank;
  return { ...rest } as any;
};

const getAccount = async (db: AppDatabase, id: Account.Id): Promise<Account> => {
  const account = await db.accounts.where({ id, _deleted: 0 }).first();
  if (!account) {
    throw new Error(`account ${id} not found`);
  }
  return account;
};

const toAccount = (account: Account): Partial<ST.Account> => {
  const { bankId, _deleted, _base, _history, type: stringType, ...rest } = account;
  const type = ST.AccountType[stringType];
  return { ...rest, type };
};

const resolvers: Resolvers = {
  Query: {
    dbs: async () => {
      const names = await Dexie.getDatabaseNames();
      return names;
    },
    bank: async (source, args, context) => {
      const db = getDb(context);
      const res = await getBank(db, args.bankId);
      return toBank(res);
    },
    banks: async (source, args, context) => {
      const db = getDb(context);
      const res = await db.banks.where({ _deleted: 0 }).toArray();
      return res.map(toBank);
    },
    account: async (source, args, context) => {
      const db = getDb(context);
      const res = await getAccount(db, args.accountId);
      return toAccount(res);
    }
  },

  Bank: {
    accounts: async (bank: ST.Bank, args, context) => {
      const db = getDb(context);
      const res = await db.accounts.where({ _deleted: 0, bankId: bank.id }).toArray();
      return res.map(toAccount);
    }
  },

  Mutation: {
    openDb: async (source, args, context): Promise<ST.Mutation['openDb']> => {
      const db = await context.openDb(args.name);
      context.setDb(db);
      return true;
    },

    closeDb: async (source, args, context) => {
      context.setDb(undefined);
      return true;
    },

    saveBank: async (source, args, context) => {
      const db = getDb(context);
      const t = context.getTime();
      let bank: Bank;
      let changes: Array<any>;
      if (args.bankId) {
        const edit = await getBank(db, args.bankId);
        const q = Bank.diff(edit, args.input);
        changes = [
          Bank.change.edit(t, args.bankId, q),
        ];
        bank = iupdate(edit, q);
      } else {
        const props: Bank.Props = {
          ...Bank.defaultValues,
          ...args.input as any,
        };
        bank = createRecord(context.genId, props);
        changes = [
          Bank.change.add(t, bank),
        ];
      }
      await db.change(changes);
      return toBank(bank);
    },

    deleteBank: async (source, args, context): Promise<ST.Mutation['deleteBank']> => {
      const db = getDb(context);
      const t = context.getTime();
      const changes = [
        Bank.change.remove(t, args.bankId),
      ];
      await db.change(changes);
      return true;
    },

    saveAccount: async (source, args, context) => {
      const db = getDb(context);
      const t = context.getTime();
      let account: Account;
      let changes: Array<any>;
      if (args.accountId) {
        const edit = await getAccount(db, args.accountId);
        const q = Account.diff(edit, args.input);
        changes = [
          Account.change.edit(t, args.accountId, q),
        ];
        account = iupdate(edit, q);
      } else {
        if (!args.bankId) {
          throw new Error('when creating an account, bankId must be specified');
        }
        const props: Account.Props = {
          ...Account.defaultValues,
          ...args.input as any,
        };
        account = {
          bankId: args.bankId,
          ...createRecord(context.genId, props)
        };
        changes = [
          Account.change.add(t, account)
        ];
      }
      await db.change(changes);
      return toAccount(account);
    },

    deleteAccount: async (source, args, context) => {
      const db = getDb(context);
      const t = context.getTime();
      const changes = [
        Account.change.remove(t, args.accountId)
      ];
      await db.change(changes);
      return true;
    },

  }
};

export default resolvers;
