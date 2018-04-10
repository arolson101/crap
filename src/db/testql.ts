import { runQuery, QueryOptions } from 'apollo-server/dist/core/runQuery';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema';
import gql from 'graphql-tag';

async function test() {
  const query = gql`
  {
    course(id: 1) {
      id
      title
      author
      description
      topic
      url
    }
  }
  `;
  const variables = {};

  const opts: QueryOptions = {
    schema,
    query,
    variables,
  };
  const res = await runQuery(opts);
  console.log(res);
}

test();
