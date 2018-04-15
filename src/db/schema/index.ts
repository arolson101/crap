import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './schema.graphql';
import { AppDatabase } from '../../state/index';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext {
  db: AppDatabase;
}
