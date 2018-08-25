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

const NavContext = React.createContext('')

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
  }
}

export const registerScreen = (screen: NavScreen) => {
  Navigation.registerComponent(screen.screenID, () => screen)
}

export interface InjectedNavProps {
  nav: {
    componentId: string
  }
}

export const withNavigation = <T extends {}>(Component: React.ComponentType<T & InjectedNavProps>) => {
  const ret = hoistStatics<T, InjectedNavProps>(
    (props) => (
      <NavContext.Consumer>
        {(componentId) =>
          <Component {...props} nav={{ componentId }} />
        }
      </NavContext.Consumer>
    ),
    Component
  )
  ret.displayName = `withNavigation(${Component.displayName || Component.name || 'unknown'})`
  return ret
}
