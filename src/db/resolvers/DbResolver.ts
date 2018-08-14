import { Service } from 'typedi'
import { DbInfo } from '../entities/index'
import { IndexDbService } from '../services/IndexDbService'
import { Arg, Mutation, Query, Resolver } from './helpers'

@Service()
@Resolver(objectType => DbInfo)
export class DbResolver {
  constructor(
    private index: IndexDbService
  ) {}

  @Query(returns => [DbInfo])
  async allDbs(): Promise<DbInfo[]> {
    return this.index.allDbs()
  }

  @Mutation(returns => Boolean)
  async createDb(
    @Arg('name') name: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
  ): Promise<Boolean> {
    return this.index.createDb(name, password)
  }

  @Mutation(returns => Boolean)
  async openDb(
    @Arg('dbId') dbId: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
  ): Promise<Boolean> {
    return this.index.openDb(dbId, password)
  }

  @Mutation(returns => Boolean)
  async closeDb(): Promise<Boolean> {
    return this.index.closeDb()
  }

  @Mutation(returns => String)
  async deleteDb(
    @Arg('dbId') dbId: string,
  ): Promise<String> {
    return this.index.deleteDb(dbId)
  }
}
