import glamorous from 'glamorous-native'
import { ThemeProp } from '../App'

export const CenteredContent = glamorous.view<ThemeProp>({},
  ({ theme }) => ({
    flexDirection: 'column',
    alignItems: 'center',
  })
)
CenteredContent.displayName = 'CenteredContent'

export const FormContent = glamorous.view<ThemeProp>({},
  ({ theme }) => ({
    flexDirection: 'column',
    width: '50%',
    maxWidth: theme.formMaxWidth,
  })
)
FormContent.displayName = 'FormContent'
