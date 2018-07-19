/* tslint:disable:no-duplicate-variable */
import * as web from './navActions.web'
import * as native from './navActions.native'
import { FormattedMessage } from 'react-intl'

export interface SelectFieldItem {
  label: string
  value: string | number
}

export interface NavPickerParams {
  title: FormattedMessage.MessageDescriptor
  items: SelectFieldItem[]
  selectedItem: string | number
  onValueChange: (selectedItem: string | number) => any
  searchable?: boolean
}

export interface NavApi {
  navBack: () => any
  navPopToTop: () => any
  login: () => any
  logout: () => any
  navHome: () => any
  navAccounts: () => any
  navBudgets: () => any
  navBank: (bankId: string) => any
  navBankCreate: () => any
  navBankEdit: (bankId: string) => any
  navAccount: (accountId: string, accountName: string) => any
  navAccountEdit: (accountId: string) => any
  navAccountCreate: (bankId: string) => any
  navPicker: (params: NavPickerParams) => any
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './navActions.web'
