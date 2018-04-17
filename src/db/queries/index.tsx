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
  (name: string) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        return (
          <Query query={QUERY}>
            {({ data, ...rest }) => {
              const componentProps = { ...props, [name]: { data, ...rest } };
              return <Component {...componentProps} />;
            }}
          </Query>
        );
      };

import ACCOUNTS_QUERY from './Accounts.graphql';
import DBS_QUERY from './Dbs.graphql';

import {
  AccountsQuery,
  DbsQuery,
} from './query-types';

export namespace Queries {
  export type Dbs = QueryType<DbsQuery>;
  export const withDbs = makeQuery(DBS_QUERY);

  export type Accounts = QueryType<AccountsQuery>;
  export const withAccounts = makeQuery(ACCOUNTS_QUERY);
}
