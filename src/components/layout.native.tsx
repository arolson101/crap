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

export const Row = glamorous.view<ThemeProp>({}, ({ theme }) => ({
  marginBottom: theme.rowMargin,
  flexDirection: 'row',
  alignItems: 'baseline'
}))
Row.displayName = 'Row'

export const LabelColumn = glamorous.view<ThemeProp>({}, ({ theme }) => ({
  width: theme.labelWidth,
  // color: theme.labelColor
}))
LabelColumn.displayName = 'LabelColumn'

export const InputColumn = glamorous.view({
  flexDirection: 'column',
  flex: 1
})
InputColumn.displayName = 'InputColumn'
