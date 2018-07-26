/* tslint:disable:no-duplicate-variable */
import * as web from './CurrencyField.web'
import * as native from './CurrencyField.native'

export interface CurrencyFieldProps<T = {}> {
  field: string
  label: FormattedMessage.MessageDescriptor
  placeholder?: FormattedMessage.MessageDescriptor
  autoFocus?: boolean
  onSubmitEditing?: () => any
  returnKeyType?: ReturnKeyType
  inputRef?: any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './CurrencyField.web'
