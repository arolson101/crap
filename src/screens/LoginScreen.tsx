import * as React from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { CenteredContent } from '../components/index'
import { Scrollable } from '../components/layout.native'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen2, registerScreen, NavContext } from './Screen2'
import { View } from 'native-base'
import { Navigation } from 'react-native-navigation'
import { Dimensions } from 'react-native'
import { Options } from 'react-native-navigation/lib/dist/interfaces/Options'
import hoistStatics from 'hoist-non-react-statics'

export class LoginScreenComponent extends React.Component<InjectedIntlProps> {
  componentDidMount() {
    console.log('mounted', this.props)
    const { intl: { formatMessage } } = this.props
    const { componentId } = this.props as any
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: formatMessage(messages.title)
        }
      }
    })
  }

  render() {
    console.log('rendered', this.props)
    // const height = (Navigation.constants() as any).statusBarHeight
    // console.log('---height: ', Navigation.constants())

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    return (
      <View style={{ position: 'absolute', left: 0, top: 0, width, height, backgroundColor: 'purple' }}>
        <Scrollable>
          <CenteredContent >
            <LoginForm />
          </CenteredContent>
        </Scrollable>
      </View>
    )
  }
}

const withComponentId = (Component: React.ComponentType) => {
  const ret = hoistStatics(
    (props: any) => {
      console.log('withcomponentid', props)
      return (
        <NavContext.Consumer>
          {(componentId) =>
            <Component {...props} componentId={componentId} />}
        </NavContext.Consumer>
      )
    },
    Component
  )
  ret.displayName = `withComponentId(${Component.displayName || Component.name || 'unknown'})`
  return ret
}

export const LoginScreen = makeScreen2({
  getTitle: () => messages.title
})(injectIntl(withComponentId(LoginScreenComponent)))

const messages = defineMessages({
  title: {
    id: 'LoginScreen.title',
    defaultMessage: 'Login'
  }
})
