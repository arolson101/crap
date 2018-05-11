import * as React from 'react'
import { LoginForm } from '../forms/LoginForm'
import { CenteredContent } from '../components'

export const LoginPage: React.SFC = (props) => {
  return (
    <CenteredContent>
      <LoginForm />
    </CenteredContent>
  )
}
