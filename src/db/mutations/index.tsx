import { DocumentNode } from 'graphql';
import * as React from 'react';
import { Query, Mutation, MutationFunc } from 'react-apollo';

interface MutationType<TData, TVariables> {
  execute: MutationFunc<TData, TVariables>;
  loading: boolean;
  error?: Error;
  called: boolean;
  data: TData | undefined;
}

const makeMutation = (QUERY: DocumentNode) =>
  (name: string) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        return (
          <Mutation mutation={QUERY}>
            {(execute, result) => {
              const componentProps = { ...props, [name]: { execute, ...result } };
              return <Component {...componentProps} />;
            }}
          </Mutation>
        );
      };

import OPENDB_MUTATION from './OpenDb.graphql';
import {
  OpenDbMutation, OpenDbMutationVariables,
} from './mutation-types';

export namespace Mutations {
  export const withOpenDb = makeMutation(OPENDB_MUTATION);
  export type OpenDb = MutationType<OpenDbMutation, OpenDbMutationVariables>;
}
