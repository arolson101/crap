import { ActionType, createAction } from 'typesafe-actions'
import { Connection } from '../../db/typeorm'

export const dbActions = {
  setIndexDb: createAction('db/setIndexDb', resolve =>
    (db: Connection) => resolve(db)
  ),
  setAppDb: createAction('db/setAppDb', resolve =>
    (db: Connection | null) => resolve(db)
  ),
}

export type DbAction = ActionType<typeof dbActions>
