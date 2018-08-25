import * as React from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { CenteredContent } from '../components/index'
import { Scrollable } from '../components/layout.native'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen2, registerScreen, InjectedNavProps, withNavigation } from './Screen2'
import { View } from 'native-base'
import { Navigation } from 'react-native-navigation'
import { Dimensions } from 'react-native'

export class LoginScreenComponent extends React.Component<InjectedIntlProps & InjectedNavProps> {
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

export const LoginScreen = injectIntl(withNavigation(LoginScreenComponent)) as React.ComponentType

const messages = defineMessages({
  title: {
    id: 'LoginScreen.title',
    defaultMessage: 'Login'
  }
})
