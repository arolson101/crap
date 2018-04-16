import * as ST from './schema-types';
import { GraphQLFieldResolver } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { ResolverContext } from './';
import Dexie from 'dexie';

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

const resolvers: Resolvers = {
  Query: {
    dbs: async () => {
      const names = await Dexie.getDatabaseNames();
      return names;
    },
    bank: async (source, args, context) => {
      if (!context.db) { throw new Error('db not open'); }
      const res = context.db.banks.where({id: args.bankId, _deleted: 0}).first();
      return res;
    },
    banks: async (source, args, context) => {
      if (!context.db) { throw new Error('db not open'); }
      const res = await context.db.banks.where({_deleted: 0}).toArray();
      return res;
    },
    allCourses: () => {
      return coursesData;
    },
    course: async (root: any, { id }: any) => {
      return coursesData.filter(course => {
        return course.id === id;
      })[0];
    },
    account: () => {
      return ({
        id: 'ID!',
        name: 'string',
        color: 'string',
        type: null,
        number: 'string',
        visible: true,
        bankid: 'string',
        key: 'string',
      });
    }
  },

  Mutation: {
    openDb: () => {
      throw new Error('foo!');
    },
    closeDb: () => true,
    createAccountInBank: () => null,
    updateAccount: () => null,
    deleteAccount: () => true,
  }
};

export default resolvers;
