import * as React from 'react'
import { NavigationContainerComponent } from 'react-navigation'
import { Subtract } from 'utility-types'
import { MessageDescriptor } from 'src/intl'

export interface SelectFieldItem {
  label: string
  value: string | number
}

export interface NavPickerParams {
  title: MessageDescriptor
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
  navTransactionEdit: (transactionId: string) => any
  navTransactionCreate: (accountId: string) => any
  navPicker: (params: NavPickerParams) => any

  setTopNavigator: (navigator: NavigationContainerComponent) => any
}

export const NavContext = React.createContext(null as any as NavApi)

export type InjectedNavProps = NavApi

export const withNav = <P extends InjectedNavProps>(Component: React.ComponentType<P>) => {
  return (props: Subtract<P, InjectedNavProps>) => {
    return (
     <NavContext.Consumer>
       {navContext =>
        <Component
          {...navContext}
          {...props}
        />
       }
     </NavContext.Consumer >
    )
  }
}
