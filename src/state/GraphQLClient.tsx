import GraphQLClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { execute } from 'graphql';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { connect } from 'react-redux';
import Observable from 'zen-observable-ts';
import schema, { ResolverContext } from '../db/schema';
import { selectors, RootState, RootStore, ThunkDependencies } from '../state';
import { AppDatabase } from './AppDatabase';
import { runQuery } from 'apollo-server-core';

export { GraphQLClient };

export const makeClient = (contextValue: ResolverContext) => new GraphQLClient({
  cache: new InMemoryCache(),
  link: new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      const opts = {
        schema,
        query: operation.query,
        variables: operation.variables,
        context: contextValue,
      };
      const exe = runQuery(opts);
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

export const GraphQLProvider: React.SFC<ThunkDependencies> = ({ children, ...deps }, context) => {
  const { store } = context;
  const contextValue: ResolverContext = { store, ...deps };
  const client = makeClient(contextValue);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
GraphQLProvider.contextTypes = { store: PropTypes.object };
