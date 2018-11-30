/* tslint:disable:no-duplicate-variable */
import * as web from './TextField.web'
import * as native from './TextField.native'
import { MessageDescriptor } from 'src/intl'

export interface TextFieldProps<Values> {
  field: keyof Values & string
  label: MessageDescriptor
  placeholder?: MessageDescriptor
  secure?: boolean
  rows?: number
  color?: string
  autoFocus?: boolean
  onSubmitEditing?: () => any
  returnKeyType?: ReturnKeyType
  noCorrect?: boolean
  inputRef?: any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './TextField.web'
