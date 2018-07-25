/* tslint:disable:no-duplicate-variable */
import * as web from './Label.web'
import * as native from './Label.native'

export interface LabelProps {
  error?: boolean
  label: FormattedMessage.MessageDescriptor
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Label.web'
