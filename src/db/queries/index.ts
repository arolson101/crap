import Course from './Course.graphql';
export { Course };
export * from './query-types';

import { Query } from 'react-apollo';
// import {} from 'apollo-client';

import { CourseQuery as CourseQueryData, CourseQueryVariables } from './query-types';

export class CourseQuery extends Query<CourseQueryData, CourseQueryVariables> {}
