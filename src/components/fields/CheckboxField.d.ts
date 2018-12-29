/* tslint:disable:no-duplicate-variable */
import * as web from './CheckboxField.web'
import * as native from './CheckboxField.native'
import { MessageDescriptor } from 'src/intl'

declare var _test: typeof web
declare var _test: typeof native

export interface CheckboxFieldProps<Values> {
  field: keyof Values & string
  label: MessageDescriptor
}

/// export to get the shape of the module
export * from './CheckboxField.web'
