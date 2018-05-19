import 'reflect-metadata'
import { buildSchemaSync } from './resolvers/helpers'
import { AccountResolver, BankResolver, DbResolver } from './resolvers'

const schema = buildSchemaSync({
  resolvers: [
    DbResolver,
    BankResolver,
    AccountResolver,
  ]
})

export default schema
