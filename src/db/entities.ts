import * as Resolvers from './resolvers/index'

export const appEntities = () => [
  Resolvers.Account,
  Resolvers.Bank,
  Resolvers.Bill,
  Resolvers.Budget,
  Resolvers.Transaction,
]

export const indexEntities = () => [
  Resolvers.DbInfo
]
