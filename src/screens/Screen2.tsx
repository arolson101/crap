import * as React from 'react'
import { Navigation } from 'react-native-navigation'
import { FormattedMessage } from 'react-intl'
import hoistStatics from 'hoist-non-react-statics'

export type NavScreen<P = any> = React.ComponentType<P> & {
  screenID: string
  getTitle: () => FormattedMessage.MessageDescriptor
}

interface Params {
  getTitle: () => FormattedMessage.MessageDescriptor
}

// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => WelcomeScreen)

export const NavContext = React.createContext('')

export const makeScreen2 = <T extends {}>(params: Params) => {
  return <P extends object>(Component: React.ComponentType<P>) => {
    return hoistStatics(class extends React.Component {
      render() {
        console.log('makescreen2', Component.displayName, this.props)
        const { componentId, ...props } = this.props as any
        return (
          <Component {...this.props} />
        )
      }
      static screenID = `Screen(${Component.displayName || Component.name || ''})`
      static getTitle = params.getTitle
    }, Component)
    // const c2 = Component as any as NavScreen<P>
    // c2.screenID = `Screen(${Component.displayName || Component.name || ''})`
    // c2.getTitle = params.getTitle
    // return c2
  }
}

export const registerScreen = (screen: NavScreen) => {
  Navigation.registerComponent(screen.screenID, () => screen)
}
