/* tslint:disable:no-duplicate-variable */
import * as web from './SelectField.web'
import * as native from './SelectField.native'

declare var _test: typeof web
declare var _test: typeof native

export interface SelectFieldItem {
  label: string
  value: string | number
}

export interface SelectFieldProps<Values> {
  field: keyof Values & string
  label: MessageDescriptor
  items: SelectFieldItem[]
  onValueChange?: (value: string | number) => any
  searchable?: boolean
}

/// export to get the shape of the module
export * from './SelectField.web'
