import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { RootStore, ThunkDependencies, AppDatabase } from '../../state';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext {
  db: AppDatabase | undefined;
  setDb: (db: AppDatabase | undefined) => any;
  deps: ThunkDependencies;
}
