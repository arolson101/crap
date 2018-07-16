import * as React from 'react'
import { CenteredContent } from '../components/index'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen2, registerScreen } from './Screen2'
import { defineMessages } from 'react-intl'

export const LoginScreenComponent: React.SFC = (props) => {
  return (
    <CenteredContent>
      <LoginForm />
    </CenteredContent>
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
