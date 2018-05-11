import * as React from 'react'
import glamorous from 'glamorous-native'
import { ThemeProp } from '../App'

export const CenteredContent = glamorous.view({
  flexDirection: 'column',
  alignItems: 'center',
})
CenteredContent.displayName = 'CenteredContent'

export const FormContent = glamorous.view({
  flexDirection: 'column',
  maxWidth: 500,
})
FormContent.displayName = 'FormContent'
