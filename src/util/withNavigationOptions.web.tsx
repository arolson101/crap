import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { NavigationScreenConfig, NavigationScreenOptions } from 'react-navigation'

export const withNavigationOptions = (navigationOptions: NavigationScreenConfig<NavigationScreenOptions>) => (
  <P extends object>(Component: React.ComponentType<P>) => Component
)

export const withTitle = (title: FormattedMessage.MessageDescriptor) => (
  <P extends object>(Component: React.ComponentType<P>) => Component
)
