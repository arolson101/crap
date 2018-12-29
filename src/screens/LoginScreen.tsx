import * as React from 'react'
import { CenteredContent } from '../components/index'
import { Scrollable } from '../components/layout.native'
import { LoginForm } from '../forms/LoginForm'
import { makeScreen } from './Screen'
import { defineMessages } from 'src/intl'

export const LoginScreenComponent: React.SFC = (props) => {
  return (
    <Scrollable>
      <CenteredContent>
        <LoginForm />
      </CenteredContent>
    </Scrollable>
  )
}

const messages = defineMessages({
  title: {
    id: 'LoginScreen.title',
    defaultMessage: 'Login'
  }
})

export const LoginScreen = makeScreen({ title: () => messages.title })(LoginScreenComponent)
