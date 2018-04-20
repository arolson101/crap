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
import { selectors, RootState, ThunkDependencies } from '../state';
import { AppDatabase } from './AppDatabase';
import { runQuery } from 'apollo-server-core';
import { Db } from '../components/ctx';

export { GraphQLClient };

interface Props {
  dependencies: ThunkDependencies;
}

interface State {
  db: AppDatabase | undefined;
}

export class GraphQLProvider extends React.Component<Props, State> {
  state = {
    db: undefined
  };

  client = new GraphQLClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      return new Observable(observer => {
        const context: ResolverContext = {
          ...this.props.dependencies,
          db: this.state.db,
          setDb: this.setDb,
        };
        const opts = {
          schema,
          query: operation.query,
          variables: operation.variables,
          context,
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

  setDb = (db: AppDatabase | undefined) => {
    this.setState({ db });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Db.Provider value={{ isOpen: !!this.state.db }}>
          {this.props.children}
        </Db.Provider>
      </ApolloProvider>
    );
  }
}
