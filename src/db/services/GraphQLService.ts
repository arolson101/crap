import { Service } from 'typedi'
import schema from '../../db/schema'
import { execute as runQuery, DocumentNode, ExecutionArgs } from 'graphql'

@Service()
export class GraphQLService {
  async execute(document: DocumentNode, variableValues: ExecutionArgs['variableValues']) {
    return runQuery({
      schema,
      document,
      variableValues
    })
  }
}
