import * as React from 'react';
import Course from './Course.graphql';
export { Course };

import AllCourses from './AllCourses.graphql';
export { AllCourses };

export * from './query-types';

import { DocumentNode } from 'graphql';
import { graphql, Query, ChildDataProps, DataValue, Mutation, MutationFunc, MutationResult } from 'react-apollo';
// import {} from 'apollo-client';

import {
  AllCoursesQuery as AllCoursesQueryData,
  CourseQuery as CourseQueryData,
  CourseQueryVariables
} from './query-types';

export class CourseQuery extends Query<CourseQueryData, CourseQueryVariables> { }
export class AllCoursesQuery extends Query<AllCoursesQueryData, {}> { }

type ChildProps = ChildDataProps<{}, Response, CourseQueryVariables>;

// const withCharacter = graphql<{}, Response, CourseQueryVariables, ChildProps>(Course, {
//   options: (props) => ({
//     variables: { episode }
//   }),
//   props: ({ data }) => ({ ...data })
// });

type QueryType<TData> = DataValue<{}> & { data: TData };
const makeQuery = (QUERY: DocumentNode, name: string) => graphql(QUERY, {
  name,
  props: ({ [name]: props }: any) => {
    const { [name]: data, ...rest } = props;
    return ({ [name]: { data, ...rest } });
  }
});

import { DbsQuery } from './query-types';
import DBS_QUERY from './Dbs.graphql';
export const withDbsQuery = makeQuery(DBS_QUERY, 'dbs');
export namespace withDbsQuery {
  export type Props = {
    dbs: QueryType<DbsQuery['dbs']>;
  };
}

type MutationType<TData, TVariables> = { execute: MutationFunc<TData, TVariables> } & MutationResult<{}>;
const makeMutation = (QUERY: DocumentNode, name: string) =>
  (Component: React.ComponentType<any>) =>
    (props: React.Props<{}>) => {
      return (
        <Mutation mutation={OPENDB_QUERY}>
          {(execute, result) => {
            const componentProps = { ...props, [name]: { execute, ...result } };
            return <Component {...componentProps} />;
          }}
        </Mutation>
      );
    };

import { OpenDbMutation, OpenDbMutationVariables } from './query-types';
import OPENDB_QUERY from './OpenDb.graphql';
export const withOpenDbMutation = makeMutation(OPENDB_QUERY, 'openDb');
export namespace withOpenDbMutation {
  export type Props = { openDb: MutationType<OpenDbMutation, OpenDbMutationVariables> };
}
