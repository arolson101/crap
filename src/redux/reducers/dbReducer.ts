import { getType } from 'typesafe-actions'
import { dbActions, DbAction } from '../actions/dbActions'
import { Connection } from '../../db/typeorm'

export interface DbState {
  indexDb: Connection | null
  appDb: Connection | null
}

const defaultState: DbState = {
  indexDb: null,
  appDb: null,
}

export const dbSelectors = {
  isIndexDbLoaded: (state: DbState) => !!state.indexDb,
  isAppDbLoaded: (state: DbState) => !!state.appDb,
  getIndexDb: (state: DbState) => state.indexDb,
  getAppDb: (state: DbState) => state.appDb,
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
