import * as React from 'react'
import glamorous from 'glamorous'
import { ThemeProp } from '../App'

export const CenteredContent = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})
CenteredContent.displayName = 'CenteredContent'

export const FormContent = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 500,
})
FormContent.displayName = 'FormContent'
