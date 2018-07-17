import glamorous from 'glamorous-native'
import * as NB from 'native-base'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { ThemeProp } from '../App/index'
import platform from 'native-base/dist/src/theme/variables/platform';

interface ButtonProps {
  block?: boolean
  onPress: () => void
  title: string | FormattedMessage.MessageDescriptor
  transparent?: boolean
}
export const Button: React.SFC<ButtonProps> = ({ block, onPress, title, transparent }) => (
  <NB.Button block={block} onPress={onPress} transparent={transparent}>
    {typeof title === 'string'
      ? <Text>{title}</Text>
      : <FormattedMessage {...title} />
    }
  </NB.Button>
)

export const Text: React.SFC<{note?: boolean}> = (props) => (
  <NB.Text {...props} />
)

export const List: React.SFC = (props) => (
  <NB.List {...props} style={{ backgroundColor: platform.cardDefaultBg }} />
)

export const ListItem: React.SFC<any> = (props) => (
  <NB.ListItem {...props}/>
)

export { Picker } from 'react-native'

export const Container = glamorous.view()
Container.displayName = 'Container'

export const CenteredContent = glamorous.view<ThemeProp>({},
  ({ theme }) => ({
    flex: 1,
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
