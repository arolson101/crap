import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { RootStore } from '../../state';
import { AppDatabase } from '../AppDatabase';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface DbDependencies {
  getTime: () => number;
  genId: () => string;
  openDb: typeof AppDatabase.open;
}

export interface ResolverContext extends DbDependencies {
  db: AppDatabase | undefined;
  setDb: (db: AppDatabase | undefined) => any;
}
