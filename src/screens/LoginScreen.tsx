import * as React from 'react'
import { CenteredContent } from '../components/index'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen } from './Screen'
import { defineMessages } from 'react-intl'

export const LoginScreenComponent: React.SFC = (props) => {
  return (
    <CenteredContent>
      <LoginForm />
    </CenteredContent>
  )
}

const messages = defineMessages({
  title: {
    id: 'LoginScreen.title',
    defaultMessage: 'Login'
  }
})

export const LoginScreen = makeScreen({ title: () => messages.title })(LoginScreenComponent)
