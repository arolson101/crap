import glamorous from 'glamorous-native'
import { Button as NBButton, Text as NBText } from 'native-base'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { ThemeProp } from '../App/index'

interface ButtonProps {
  block?: boolean
  onPress: () => void
  title: string | FormattedMessage.MessageDescriptor
}
export const Button: React.SFC<ButtonProps> = ({ block, onPress, title }) => (
  <NBButton block={block} onPress={onPress}>
    {typeof title === 'string'
      ? <Text>{title}</Text>
      : <FormattedMessage {...title} />
    }
  </NBButton>
)

export const Text: React.SFC = ({ children }) => (
  <NBText>{children}</NBText>
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
    width: '90%',
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
  flexDirection: 'column',
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
