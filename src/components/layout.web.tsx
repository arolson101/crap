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

export const Row = glamorous.div<ThemeProp>({}, ({ theme }) => ({
  marginBottom: theme.rowMargin,
  flexDirection: 'row',
  alignItems: 'baseline'
}))
Row.displayName = 'Row'

export const LabelColumn = glamorous.span<ThemeProp>({}, ({ theme }) => ({
  width: theme.labelWidth,
  fontSize: theme.labelFontSize,
  color: theme.labelColor
}))
LabelColumn.displayName = 'LabelColumn'

export const InputColumn = glamorous.div({
  flexDirection: 'column',
  flex: 1
})
InputColumn.displayName = 'InputColumn'
