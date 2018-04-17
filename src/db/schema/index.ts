import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './schema.graphql';
import { RootStore } from '../../state';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext {
  store: RootStore;
}
