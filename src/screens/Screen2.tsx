import * as React from 'react'
import { Navigation } from 'react-native-navigation'
import { FormattedMessage } from 'react-intl'

export type NavScreen<P = any> = React.ComponentType<P> & {
  screenID: string
  getTitle: () => FormattedMessage.MessageDescriptor
}

interface Params {
  getTitle: () => FormattedMessage.MessageDescriptor
}

// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => WelcomeScreen)

export const makeScreen2 = <T extends {}>(params: Params) => {
  return <P extends object>(Component: React.ComponentType<P>) => {
    const c2 = Component as any as NavScreen<P>
    c2.screenID = `Screen(${Component.displayName || Component.name || ''})`
    c2.getTitle = params.getTitle
    return c2
  }
}

export const registerScreen = (screen: NavScreen) => {
  Navigation.registerComponent(screen.screenID, () => screen)
}
