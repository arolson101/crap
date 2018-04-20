import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { RootStore, ThunkDependencies, AppDatabase } from '../../state';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext extends ThunkDependencies {
  db: AppDatabase | undefined;
  setDb: (db: AppDatabase | undefined) => any;
}
