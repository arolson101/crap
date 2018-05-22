import { AccountResolver, BankResolver, DbResolver,
  BillResolver, TransactionResolver, BudgetResolver,
  CategoryResolver
} from './resolvers'
import { buildSchemaSync } from './resolvers/helpers'

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
