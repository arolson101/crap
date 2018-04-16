import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './schema.graphql';
import { RootStore } from '../../state';
import { AppDatabase } from './AppDatabase';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext {
  db?: AppDatabase;
}
