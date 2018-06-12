import * as React from 'react'
import { Button as RNButton, Text as RNText } from 'react-native'
import glamorous from 'glamorous-native'
import { ThemeProp } from '../App'

interface ButtonProps {
  onPress: () => void
  title: string
}
export const Button: React.SFC<ButtonProps> = ({ onPress, title }) => (
  <RNButton onPress={onPress} title={title} />
)

export const Text: React.SFC = ({ children }) => (
  <RNText>{children}</RNText>
)

export { Picker } from 'react-native'

export const Container = glamorous.view()
Container.displayName = 'Container'

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

export const Column = glamorous.view<ThemeProp>({}, ({ theme }) => ({
  flexDirection: 'row',
}))
Column.displayName = 'Column'

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
