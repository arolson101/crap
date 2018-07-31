import { runQuery } from 'apollo-server-core'
import { Service } from 'typedi'
import schema from '../../db/schema'
import { DocumentNode } from 'graphql'

@Service()
export class GraphQLService {
  async execute(query: DocumentNode, variables: any) {
    return runQuery({
      schema,
      query,
      variables
    })
  }
}
