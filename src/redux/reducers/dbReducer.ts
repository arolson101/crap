import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import GraphQLClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { runQuery } from 'apollo-server-core'
import { getType } from 'typesafe-actions'
import Observable from 'zen-observable-ts'
import { ResolverContext } from '../../db/index'
import schema from '../../db/schema'
import { Connection } from '../../db/typeorm'
import { DbAction, dbActions } from '../actions/dbActions'

export class AppGraphQLClient extends GraphQLClient<NormalizedCacheObject> {
  context: ResolverContext

  constructor () {
    super({
      cache: new InMemoryCache(),
      link: new ApolloLink((operation, forward) => {
        return new Observable(observer => {
          const opts = {
            schema,
            query: operation.query,
            variables: operation.variables,
            context: this.context,
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
}

export interface DbState {
  indexDb: Connection | null
  appDb: Connection | null
  appGraphQLClient: AppGraphQLClient
}

const defaultState: DbState = {
  indexDb: null,
  appDb: null,
  appGraphQLClient: new AppGraphQLClient(),
}

export const dbSelectors = {
  isIndexDbLoaded: (state: DbState) => !!state.indexDb,
  isAppDbLoaded: (state: DbState) => !!state.appDb,
  getIndexDb: (state: DbState) => state.indexDb,
  getAppDb: (state: DbState) => state.appDb,
  getAppGraphQLClient: (state: DbState) => state.appGraphQLClient,
}

export const dbReducer = (state: DbState = defaultState, action: DbAction): DbState => {
  switch (action.type) {
    case getType(dbActions.setIndexDb):
      return { ...state, indexDb: action.payload }

    case getType(dbActions.setAppDb):
      return { ...state, appDb: action.payload }

    default:
      return state
  }
}
