import 'reflect-metadata'
import { AccountResolver, BankResolver, DbResolver } from './resolvers'
import { buildSchemaSync } from './resolvers/helpers'

const schema = buildSchemaSync({
  resolvers: [
    DbResolver,
    BankResolver,
    AccountResolver,
  ]
})

export default schema
