import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { RootStore, ThunkDependencies } from '../../state';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;

export interface ResolverContext extends ThunkDependencies {
  store: RootStore;
}
