import { InjectedIntl } from 'react-intl'
import { ActionType, createAction } from 'typesafe-actions'
import { Connection } from '../../db/typeorm'

export type FormatMessageFcn = InjectedIntl['formatMessage']

export const dbActions = {
  initDb: createAction('db/initDb', resolve =>
    (indexDb: Connection, formatMessage: FormatMessageFcn) => resolve({ indexDb, formatMessage })
  ),
}

export type DbAction = ActionType<typeof dbActions>
