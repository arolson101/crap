import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import GraphQLClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { runQuery } from 'apollo-server-core'
import { getType } from 'typesafe-actions'
import Observable from 'zen-observable-ts'
import schema from '../../db/schema'
import { Connection } from '../../db/typeorm'
import { DbAction, dbActions } from '../actions/dbActions'

export interface ResolverContext {
  indexDb: Connection
  appDb: Connection
  setAppDb: (db: Connection | null) => any
}

export class AppGraphQLClient extends GraphQLClient<NormalizedCacheObject> {
  private appDb: Connection | null

  constructor(private indexDb: Connection) {
    super({
      cache: new InMemoryCache(),
      link: new ApolloLink((operation, forward) => {
        return new Observable(observer => {
          const opts = {
            schema,
            query: operation.query,
            variables: operation.variables,
            context: {
              indexDb: this.indexDb,
              appDb: this.appDb,
              setAppDb: this.setAppDb,
            },
          }

          const exe = runQuery(opts as any)
          exe.then(res => {
            observer.next(res as any)
            observer.complete()
          }).catch(err => {
            observer.error(err)
            observer.complete()
          })
        })
      })
    })
  }

  setAppDb: ResolverContext['setAppDb'] = (appDb) => {
    this.appDb = appDb
  }
}

export interface DbState {
  appGraphQLClient: AppGraphQLClient | null
}

const defaultState: DbState = {
  appGraphQLClient: null,
}

export const dbSelectors = {
  getAppGraphQLClient: (state: DbState) => state.appGraphQLClient,
}

export const dbReducer = (state: DbState = defaultState, action: DbAction): DbState => {
  switch (action.type) {
    case getType(dbActions.initDb):
      return { ...state, appGraphQLClient: new AppGraphQLClient(action.payload.indexDb) }

    default:
      return state
  }
}
