import { runQuery, QueryOptions } from 'apollo-server/dist/core/runQuery';
import { makeExecutableSchema } from 'graphql-tools';
const typeDefs = require('./schema.graphql');
// const typeDefs = `
//   type Query {
//     books: [Book]
//     book(title: String): Book
//   }
//   type Book { title: String, author: String }
// `;

const books = [
  {
    title: `Harry Potter and the Sorcerer's stone`,
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The resolvers
const resolvers = {
  Query: {
    books: () => Promise.resolve(books),
    book: (source: any, {title}: any) => {
      const book = books.find(b => b.title === title);
      if (book) {
        return Promise.resolve(book);
      } else {
        return Promise.reject(`did not find book ${title}`);
      }
    },
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function test() {
  const query = `
  {
    book(title: "Harry Potter and the Sorcerer's stone") {
      title
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
