// import { makeExecutableSchema } from 'graphql-tools'
// import resolvers from './resolvers'
// import typeDefs from './schema.graphql'

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })

import { Input, Field, Type, makeSchema, Mutation, String, Boolean } from 'graphql-typescript'
import { Account2 } from '../records/Account'
import Dexie from 'dexie'

@Input class None {}

@Type class Query {
  @Field([String]) async dbs (_: any, args: None, context: any) {
    const names = await Dexie.getDatabaseNames()
    return names
  }
  // @Field account: Account2

  @Mutation(Boolean) async openDb(_: any, { password }: OpenDbArgs, context: any) {
    console.log(password)
  }
}

class OpenDbArgs {
  @Field password: String
}

const schema = makeSchema(Query, {
  types: [
    Account2,
  ]
})
// console.log(schema)

export default schema
