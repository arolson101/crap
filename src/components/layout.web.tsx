import glamorous from 'glamorous'
import { ThemeProp } from '../App'

export const CenteredContent = glamorous.div<ThemeProp>({},
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  })
)
CenteredContent.displayName = 'CenteredContent'

export const FormContent = glamorous.div<ThemeProp>({},
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    maxWidth: theme.formMaxWidth,
  })
)
FormContent.displayName = 'FormContent'
