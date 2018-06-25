import * as React from 'react'
import { NavigationScreenConfig } from 'react-navigation'
import { FormattedMessage } from 'react-intl'
import { Text } from 'react-native'

export const withNavigationOptions = (navigationOptions: NavigationScreenConfig<any>) => (
  <P extends object>(Component: React.ComponentType<P>) => (
    class WithNavigationOptions extends React.Component<P> {
      static navigationOptions = navigationOptions
      render () {
        return <Component {...this.props} />
      }
    }
  )
)

export const withTitle = (title: FormattedMessage.MessageDescriptor) => (
  withNavigationOptions({
    headerTitle: <Text><FormattedMessage {...title}/></Text>
  })
)
