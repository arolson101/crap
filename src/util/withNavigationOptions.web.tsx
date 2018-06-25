import * as React from 'react'
import { FormattedMessage } from 'react-intl'

export const withNavigationOptions = (navigationOptions: any) => (
  <P extends object>(Component: React.ComponentType<P>) => Component
)

export const withTitle = (title: FormattedMessage.MessageDescriptor) => (
  <P extends object>(Component: React.ComponentType<P>) => Component
)
