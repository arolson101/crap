import { DocumentNode } from 'graphql';
import * as React from 'react';
import { Query, Mutation, MutationFunc } from 'react-apollo';

export * from './mutation-types';

interface MutationType<TData, TVariables> {
  execute: MutationFunc<TData, TVariables>;
  loading: boolean;
  error?: Error;
  called: boolean;
  data: TData | undefined;
}

const makeMutation = (QUERY: DocumentNode, refetchQueries: DocumentNode[] = []) =>
  (name: string) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        return (
          <Mutation
            mutation={QUERY}
            refetchQueries={refetchQueries.map(query => ({query}))}
          >
            {(execute, result) => {
              const componentProps = { ...props, [name]: { execute, ...result } };
              return <Component {...componentProps} />;
            }}
          </Mutation>
        );
      };

import DELETEBANK_MUTATION from './DeleteBank.graphql';
import OPENDB_MUTATION from './OpenDb.graphql';
import SAVEACCOUNT_MUTATION from './SaveAccount.graphql';
import SAVEBANK_MUTATION from './SaveBank.graphql';
import {
  DeleteBankMutation, DeleteBankMutationVariables,
  OpenDbMutation, OpenDbMutationVariables,
  SaveAccountMutation, SaveAccountMutationVariables,
  SaveBankMutation, SaveBankMutationVariables,
} from './mutation-types';

import BANKS_QUERY from '../queries/Banks.graphql';

export namespace Mutations {
  export const withDeleteBank = makeMutation(DELETEBANK_MUTATION);
  export type DeleteBank = MutationType<DeleteBankMutation, DeleteBankMutationVariables>;

  export const withOpenDb = makeMutation(OPENDB_MUTATION);
  export type OpenDb = MutationType<OpenDbMutation, OpenDbMutationVariables>;

  export const withSaveAccount = makeMutation(SAVEACCOUNT_MUTATION, [BANKS_QUERY]);
  export type SaveAccount = MutationType<SaveAccountMutation, SaveAccountMutationVariables>;

  export const withSaveBank = makeMutation(SAVEBANK_MUTATION, [BANKS_QUERY]);
  export type SaveBank = MutationType<SaveBankMutation, SaveBankMutationVariables>;
}
