import * as React from 'react';
import GraphQLClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { execute } from 'graphql';
import { ApolloProvider } from 'react-apollo';
import { connect } from 'react-redux';
import Observable from 'zen-observable-ts';
import schema, { ResolverContext } from '../db/schema';
import { selectors, RootState } from '../state';
import { AppDatabase } from './AppDatabase';

export { GraphQLClient };

export const makeClient = (db: AppDatabase) => new GraphQLClient({
  cache: new InMemoryCache(),
  link: new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      const contextValue: ResolverContext = { db };
      const opts = {
        schema,
        document: operation.query,
        variableValues: operation.variables,
        contextValue,
      };
      const exe = execute(opts);
      if ('then' in exe) {
        exe.then(res => {
          observer.next(res);
          observer.complete();
        }).catch(err => {
          observer.error(err);
          observer.complete();
        });
      } else {
        observer.next(exe);
        observer.complete();
      }
    });
  }),
});

const GraphQLProviderComponent: React.SFC<{client: any}> = ({client, children}) => {
  if (!client) {
    return <>{children}</>;
  }
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export const GraphQLProvider = connect(
  (state: RootState) => ({
    client: selectors.getGraphQLClient(state),
  })
)(GraphQLProviderComponent);
