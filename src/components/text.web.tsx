import * as React from 'react'
import glamorous from 'glamorous'
import { ThemeProp } from '../App'

export const AppBannerText = glamorous.span<ThemeProp>({},
  ({ theme }) => ({
    fontSize: theme.appBannerFontSize,
    marginBottom: theme.appBannerMargin,
  })
)
AppBannerText.displayName = 'AppBannerText'

export const WelcomeText = glamorous.span<ThemeProp>({},
  ({ theme }) => ({
    fontSize: theme.welcomeFontSize,
    marginBottom: theme.welcomeMargin,
  })
)
WelcomeText.displayName = 'WelcomeText'

export const ErrorText = glamorous.span<ThemeProp & { margin?: number }>({},
  ({ theme, margin }) => ({
    color: theme.errorTextColor,
    margin,
  })
)
ErrorText.displayName = 'ErrorText'
