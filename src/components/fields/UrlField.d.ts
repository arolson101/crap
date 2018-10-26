import { ReturnKeyType } from 'react-native'
import * as web from './UrlField.web'
import * as native from './UrlField.native'
import { MessageDescriptor } from '../../intl'

export interface UrlFieldProps<Values> {
  field: keyof Values & string
  favicoField: keyof Values & string
  label: MessageDescriptor
  placeholder?: MessageDescriptor
  autoFocus?: boolean
  onSubmitEditing?: () => any
  returnKeyType?: ReturnKeyType
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './UrlField.web'
