import { useContainer as gqlUseContainer } from 'type-graphql/utils/container'
import { Container } from 'typedi'
import { buildSchemaSync } from './resolvers/helpers'
import { AccountResolver, BankResolver, BillResolver, BudgetResolver, CategoryResolver, DbResolver, TransactionResolver } from './resolvers/index'

gqlUseContainer(Container)

const schema = buildSchemaSync({
  resolvers: [
    DbResolver,
    BankResolver,
    AccountResolver,
    BillResolver,
    TransactionResolver,
    BudgetResolver,
    CategoryResolver,
  ]
})

export default schema
