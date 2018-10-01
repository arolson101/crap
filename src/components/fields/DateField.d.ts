import * as web from './DateField.web'
import * as android from './DateField.android'
import * as ios from './DateField.ios'

export interface DateFieldProps<T = {}> {
  field: keyof T
  label: FormattedMessage.MessageDescriptor
  collapsed?: boolean
}

declare var _test: typeof web
declare var _test: typeof android
declare var _test: typeof ios

/// export to get the shape of the module
export * from './DateField.web'
