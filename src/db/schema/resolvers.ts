import * as ST from './schema-types';
import { GraphQLFieldResolver } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { ResolverContext } from './';
import Dexie from 'dexie';
import { actions, Account, Bank, AppDatabase } from '../../state';

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
    createAccountInBank: Resolver<ST.Mutation['createAccountInBank'], ST.CreateAccountInBankMutationArgs>;
    updateAccount: Resolver<ST.Mutation['updateAccount'], ST.UpdateAccountMutationArgs>;
    deleteAccount: Resolver<ST.Mutation['deleteAccount'], ST.DeleteAccountMutationArgs>;
  };
}

const getBank = (db: AppDatabase, id: Bank.Id): Promise<Bank | undefined> => {
  return db.banks.where({id, _deleted: 0}).first();
};

const toAccount = (account: Account): ST.Account => {
  const { _deleted, _base, _history, type: stringType, ...rest } = account;
  const type = ST.AccountType[stringType];
  return { ...rest, type };
};

const getAccount = async (db: AppDatabase, id: Account.Id): Promise<ST.Account | undefined> => {
  const account = await db.accounts.where({id, _deleted: 0}).first();
  return account && toAccount(account);
};

const toBank = async (db: AppDatabase, dbBank: Bank): Promise<ST.Bank> => {
  const { accounts: accountIds, _deleted, _base, _history, ...rest } = dbBank;
  const accountsWithNulls = await db.transaction('r', db.accounts, () => {
    return Promise.all(accountIds.map(accountId =>
      getAccount(db, accountId)
    ));
  });
  const accounts = accountsWithNulls.filter((account): account is ST.Account => !!account);
  return { ...rest, accounts };
};

const getDb = (context: ResolverContext) => {
  const db = context.store.getState().db.db;
  if (!db) {
    throw new Error('db not open');
  }
  return db;
};

const resolvers: Resolvers = {
  Query: {
    dbs: async (): Promise<ST.Query['dbs']> => {
      const names = await Dexie.getDatabaseNames();
      return names;
    },
    bank: async (source, args, context): Promise<ST.Query['bank']> => {
      const db = getDb(context);
      const res = await db.banks.where({id: args.bankId, _deleted: 0}).first();
      return res && toBank(db, res);
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
    account: (): ST.Query['account'] => {
      return ({
        id: 'ID!',
        name: 'string',
        color: 'string',
        type: ST.AccountType.CHECKING,
        number: 'string',
        visible: true,
        bankid: 'string',
        key: 'string',
      });
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
    createAccountInBank: (): Promise<ST.Mutation['createAccountInBank']> | null => null,
    updateAccount: (): Promise<ST.Mutation['updateAccount']> | null => null,
    deleteAccount: (): Promise<ST.Mutation['deleteAccount']> | boolean => true,
  }
};

export default resolvers;
