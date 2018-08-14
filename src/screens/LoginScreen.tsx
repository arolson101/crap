import * as React from 'react'
import { defineMessages } from 'react-intl'
import { CenteredContent } from '../components/index'
import { Scrollable } from '../components/layout.native'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen2, registerScreen } from './Screen2'

export const LoginScreenComponent: React.SFC = (props) => {
  return (
    <Scrollable>
      <CenteredContent>
        <LoginForm />
      </CenteredContent>
    </Scrollable>
  )
}

export const LoginScreen = makeScreen2({
  getTitle: () => messages.title
})(LoginScreenComponent)

const messages = defineMessages({
  title: {
    id: 'LoginScreen.title',
    defaultMessage: 'Login'
  }
})
