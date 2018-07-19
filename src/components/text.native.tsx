import * as React from 'react'
import glamorous from 'glamorous-native'
import { ThemeProp } from '../App/index'
import { H1 } from 'native-base'

export const AppBannerText: React.SFC = (props) => <H1 {...props}/>

export const WelcomeText = glamorous.text<ThemeProp>({},
  ({ theme }) => ({
    fontSize: theme.welcomeFontSize,
    marginBottom: theme.welcomeMargin,
  })
)
WelcomeText.displayName = 'WelcomeText'

export const ErrorText = glamorous.text<ThemeProp & { margin?: number }>({},
  ({ theme, margin }) => ({
    color: theme.errorTextColor,
    margin,
  })
)
ErrorText.displayName = 'ErrorText'
