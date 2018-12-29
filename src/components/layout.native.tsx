import glamorous from 'glamorous-native'
import * as NB from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { ScrollView } from 'react-native'
import { ThemeProp } from '../App/index'
import { MessageDescriptor, intl } from 'src/intl'

interface ButtonProps {
  block?: boolean
  onPress: () => void
  title: string | MessageDescriptor
  transparent?: boolean
}
export const Button: React.SFC<ButtonProps> = ({ block, onPress, title, transparent }) => (
  <NB.Button block={block} onPress={onPress} transparent={transparent}>
    <Text>{typeof title === 'string' ? title : intl.formatMessage(title)}</Text>
  </NB.Button>
)

export const Text: React.SFC<{ note?: boolean }> = (props) => (
  <NB.Text {...props} />
)

export const List: React.SFC = (props) => (
  <NB.List {...props} style={{ backgroundColor: platform.cardDefaultBg }} />
)

export const ListItem: React.SFC<any> = (props) => (
  <NB.ListItem {...props} />
)

export { Picker } from 'react-native'

export const Container = glamorous.view()
Container.displayName = 'Container'

export const Scrollable: React.SFC<any> = (props) => <ScrollView {...props} />

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
