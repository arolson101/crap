/* tslint:disable:no-duplicate-variable */
import { FormattedMessage } from 'react-intl'
import * as native from './Confirmation.native'
import * as web from './Confirmation.web'

export interface Params {
  title: FormattedMessage.MessageDescriptor
  action: FormattedMessage.MessageDescriptor
  onConfirm: () => any
  formatMessage: (message: FormattedMessage.MessageDescriptor) => string
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Confirmation.web'
