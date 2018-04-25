declare module 'apollo-storybook-react' {
  import { DocumentNode } from 'graphql'

  type DecoratorType = {
    // string representing your graphql schema, if you use tools like `babel-plugin-inline-import` you can import this from a  .graphql file
    typeDefs: string | Array<string> | DocumentNode,
    // object that resolves the keys of your graphql schema
    mocks: Object,
    apolloClientOptions?: Object,
    apolloLinkOptions?: Object,
    // optional typeResolvers for complex mocking
    typeResolvers?: Object,
    // optional context
    context?: Object,
    // optional root value
    rootValue?: Object
  }

  function apolloStorybookDecorator (opts: DecoratorType): any
  export default apolloStorybookDecorator
}
