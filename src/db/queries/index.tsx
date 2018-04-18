import { DocumentNode } from 'graphql';
import * as React from 'react';
import { Query, Mutation, MutationFunc } from 'react-apollo';

import Course from './Course.graphql';
export { Course };

import AllCourses from './AllCourses.graphql';
export { AllCourses };

import {
  AllCoursesQuery as AllCoursesQueryData,
  CourseQuery as CourseQueryData,
  CourseQueryVariables
} from './query-types';

export class CourseQuery extends Query<CourseQueryData, CourseQueryVariables> { }
export class AllCoursesQuery extends Query<AllCoursesQueryData, {}> { }

interface QueryType<TData> {
  data: TData;
  loading: boolean;
  error?: Error;
}

const makeQuery = (QUERY: DocumentNode) =>
  (name: string, variablesFcn?: (props: any) => Object | undefined) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        const variables = variablesFcn && variablesFcn(props);
        const skip = !variablesFcn || (variablesFcn && !variables);
        return (
          <Query
            query={QUERY}
            variables={variables}
            // fetchPolicy="network-only"
          >
            {({ data, ...rest }) => {
              const componentProps = { ...props, [name]: { data, ...rest } };
              return <Component {...componentProps} />;
            }}
          </Query>
        );
      };

import ACCOUNT_QUERY from './Account.graphql';
import ACCOUNTS_QUERY from './Accounts.graphql';
import BANK_QUERY from './Bank.graphql';
import BANKS_QUERY from './Banks.graphql';
import DBS_QUERY from './Dbs.graphql';

import {
  AccountQuery,
  AccountsQuery,
  BankQuery,
  BanksQuery,
  DbsQuery,
} from './query-types';

export namespace Queries {
  export type Account = QueryType<AccountQuery>;
  export const withAccount = makeQuery(ACCOUNT_QUERY);

  export type Accounts = QueryType<AccountsQuery>;
  export const withAccounts = makeQuery(ACCOUNTS_QUERY);

  export type Bank = QueryType<BankQuery>;
  export const withBank = makeQuery(BANK_QUERY);

  export type Banks = QueryType<BanksQuery>;
  export const withBanks = makeQuery(BANKS_QUERY);

  export type Dbs = QueryType<DbsQuery>;
  export const withDbs = makeQuery(DBS_QUERY);
}
