var coursesData = [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
      id: 3,
      title: 'JavaScript: Understanding The Weird Parts',
      author: 'Anthony Alicea',
      // tslint:disable-next-line:max-line-length
      description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
      topic: 'JavaScript',
      url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
];

const resolvers = {
  Query: {
      allCourses: () => {
          return coursesData;
      },
      course: (root: any, {id}: any) => {
          return coursesData.filter(course => {
              return course.id === id;
          })[0];
      },
      account: () => {
          return ({
            id: 'ID!',
            name: 'string',
            color: 'string',
            type: 1,
            number: 'string',
            visible: true,
            bankid: 'string',
            key: 'string',
          });
      }
  }
};

export default resolvers;
