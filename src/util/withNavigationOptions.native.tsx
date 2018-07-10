import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { NavigationScreenConfig, NavigationScreenOptions } from 'react-navigation'
import { ScreenProps } from '../screens/Screen'

export const withNavigationOptions = (navigationOptions: NavigationScreenConfig<NavigationScreenOptions>) => (
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
  withNavigationOptions(({ screenProps }) => {
    const { intl } = screenProps as ScreenProps
    return ({
      title: intl.formatMessage(title)
    })
  })
)
