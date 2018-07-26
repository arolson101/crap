import { ActionType, createAction } from 'typesafe-actions'
import { Connection } from '../../db/typeorm'
import { FormattedMessage } from 'react-intl'

export type FormatMessageFcn = (message: FormattedMessage.MessageDescriptor) => string

export const dbActions = {
  initDb: createAction('db/initDb', resolve =>
    (indexDb: Connection, formatMessage: FormatMessageFcn) => resolve({ indexDb, formatMessage })
  ),
}

export type DbAction = ActionType<typeof dbActions>
