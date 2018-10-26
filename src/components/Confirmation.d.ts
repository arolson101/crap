/* tslint:disable:no-duplicate-variable */
import * as native from './Confirmation.native'
import * as web from './Confirmation.web'
import { MessageDescriptor } from '../intl'

export interface Params {
  title: MessageDescriptor
  action: MessageDescriptor
  onConfirm: () => any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Confirmation.web'
