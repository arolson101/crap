import { Field, Type, makeSchema } from 'graphql-typescript'
import { Account2 } from './Account'

@Type class Query {
  @Field account: Account2
}

export const schema = makeSchema(Query, {
  types: [
    Account2
  ]
})
// console.log(schema)
