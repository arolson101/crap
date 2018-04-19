import * as ST from './schema-types';
import { GraphQLFieldResolver } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { ResolverContext } from './';
import Dexie from 'dexie';
import { actions, Account, Bank, AppDatabase, createRecord } from '../../state';
import { iupdate } from '../../iupdate';

var coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    // tslint:disable-next-line:max-line-length
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
];

// see GraphQLTypeResolver
type Resolver<TRet, TArgs = {}> = (source: {}, args: TArgs, context: ResolverContext) => TRet | Promise<TRet>;

interface Resolvers extends IResolvers<{}, ResolverContext> {
  Query: {
    dbs: Resolver<ST.Query['dbs']>;
    allCourses: Resolver<ST.Query['allCourses']>;
    course: Resolver<ST.Query['course'], ST.CourseQueryArgs>;
    bank: Resolver<ST.Query['bank'], ST.BankQueryArgs>;
    banks: Resolver<ST.Query['banks']>;
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
  const db = context.store.getState().db.db;
  if (!db) {
    throw new Error('db not open');
  }
  return db;
};

const getBank = async (db: AppDatabase, id: Bank.Id | string): Promise<Bank> => {
  const bank = await db.banks.where({id, _deleted: 0}).first();
  if (!bank) {
    throw new Error(`bank ${id} not found`);
  }
  return bank;
};

const toBank = async (db: AppDatabase, dbBank: Bank): Promise<ST.Bank> => {
  const { accounts: accountIds, _deleted, _base, _history, ...rest } = dbBank;
  const accountsWithNulls = await db.transaction('r', db.accounts, () => {
    return Promise.all(accountIds.map(async accountId =>
      toAccount(await getAccount(db, accountId))
    ));
  });
  const accounts = accountsWithNulls.filter((account): account is ST.Account => !!account);
  return { ...rest, accounts };
};

const getAccount = async (db: AppDatabase, id: Account.Id): Promise<Account> => {
  const account = await db.accounts.where({id, _deleted: 0}).first();
  if (!account) {
    throw new Error(`account ${id} not found`);
  }
  return account;
};

const toAccount = (account: Account): ST.Account => {
  const { _deleted, _base, _history, type: stringType, ...rest } = account;
  const type = ST.AccountType[stringType];
  return { ...rest, type };
};

const resolvers: Resolvers = {
  Query: {
    dbs: async (): Promise<ST.Query['dbs']> => {
      const names = await Dexie.getDatabaseNames();
      return names;
    },
    bank: async (source, args, context): Promise<ST.Query['bank']> => {
      const db = getDb(context);
      const res = await getBank(db, args.bankId);
      return toBank(db, res);
    },
    banks: async (source, args, context): Promise<ST.Query['banks']> => {
      const db = getDb(context);
      return await db.transaction('r', db.banks, db.accounts, async (): Promise<ST.Query['banks']> => {
        const res = await db.banks.where({_deleted: 0}).toArray();
        return Promise.all(res.map(bank => toBank(db, bank)));
      });
    },
    allCourses: (): ST.Query['allCourses'] => {
      return coursesData;
    },
    course: (root: any, { id }): ST.Query['course'] => {
      return coursesData.filter(course => {
        return course.id === id;
      })[0];
    },
    account: async (source, args, context): Promise<ST.Query['account']> => {
      const db = getDb(context);
      const res = await getAccount(db, args.accountId);
      return toAccount(res);
    }
  },

  Mutation: {
    openDb: async (source, args, {store}): Promise<ST.Mutation['openDb']> => {
      await store.dispatch(actions.dbOpen(args.name, args.password));
      const db = store.getState().db;
      if (db.openError) {
        throw db.openError;
      }
      return !!db.db;
    },

    closeDb: async (source, args, context): Promise<ST.Mutation['closeDb']> => {
      return true;
    },

    saveBank: async (source, args, context): Promise<ST.Mutation['saveBank']> => {
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
        bank = {
          ...createRecord(context.genId, props),
          accounts: []
        };
        changes = [
          Bank.change.add(t, bank),
        ];
      }
      await context.store.dispatch(actions.dbChange(changes));
      return toBank(db, bank);
    },

    deleteBank: async (source, args, context): Promise<ST.Mutation['deleteBank']> => {
      const db = getDb(context);
      const t = context.getTime();
      const changes = [
        Bank.change.remove(t, args.bankId),
      ];
      await context.store.dispatch(actions.dbChange(changes));
      return true;
    },

    saveAccount: async (source, args, context): Promise<ST.Mutation['saveAccount']> => {
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
        account = createRecord(context.genId, props);
        changes = [
          Account.change.add(t, account),
          Bank.change.addAccount(t, args.bankId, account.id),
        ];
      }
      await context.store.dispatch(actions.dbChange(changes));
      return toAccount(account);
    },

    deleteAccount: async (source, args, context): Promise<ST.Mutation['deleteAccount']> => {
      const db = getDb(context);
      const t = context.getTime();
      const changes = [
        Account.change.remove(t, args.accountId),
        Bank.change.removeAccount(t, args.bankId, args.accountId),
      ];
      await context.store.dispatch(actions.dbChange(changes));
      return true;
    },

  }
};

export default resolvers;
