import { ActionType, createAction } from 'typesafe-actions'
import { Connection } from '../../db/typeorm'

export const dbActions = {
  initDb: createAction('db/initDb', resolve =>
    (indexDb: Connection) => resolve({ indexDb })
  ),
}

export type DbAction = ActionType<typeof dbActions>
