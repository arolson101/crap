import { execute } from 'graphql';
import schema from './schema';
import gql from 'graphql-tag';
import { Course, CourseQuery } from './queries';

const document = Course;

async function test() {
  const variableValues = {id: 1};

  const opts = {
    schema,
    document,
    variableValues,
  };
  const res = await execute(opts);
  const data = res.data as CourseQuery;
  console.log(res);
}

test();
