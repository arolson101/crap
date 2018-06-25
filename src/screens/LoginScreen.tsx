import * as React from 'react'
import { CenteredContent } from '../components'
import { LoginForm } from '../forms/LoginForm'

export const LoginPage: React.SFC = (props) => {
  return (
    <CenteredContent>
      <LoginForm />
    </CenteredContent>
  )
}
