import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import GraphQLClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { runQuery } from 'apollo-server-core'
import Observable from 'zen-observable-ts'
import schema from '../../db/schema'
import { DbAction } from '../actions/dbActions'

export class AppGraphQLClient extends GraphQLClient<NormalizedCacheObject> {
  constructor() {
    super({
      cache: new InMemoryCache(),
      link: new ApolloLink((operation, forward) => {
        return new Observable(observer => {
          const opts = {
            schema,
            query: operation.query,
            variables: operation.variables,
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
  appGraphQLClient: AppGraphQLClient
}

const defaultState: DbState = {
  appGraphQLClient: new AppGraphQLClient(),
}

export const dbSelectors = {
  getAppGraphQLClient: (state: DbState) => state.appGraphQLClient,
}

export const dbReducer = (state: DbState = defaultState, action: DbAction): DbState => {
  switch (action.type) {
    // case getType(dbActions.initDb):
    //   return { ...state, appGraphQLClient: new AppGraphQLClient(action.payload.indexDb, action.payload.formatMessage) }

    default:
      return state
  }
}
