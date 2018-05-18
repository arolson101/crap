import { buildSchemaSync } from './types/helpers'
import { AccountResolver, BankResolver, DbResolver } from './types'

const schema = buildSchemaSync({
  resolvers: [
    AccountResolver,
    BankResolver,
    DbResolver
  ]
})

export default schema
