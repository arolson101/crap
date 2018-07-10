import { Button as BPButton } from '@blueprintjs/core'
import glamorous from 'glamorous'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { ThemeProp } from '../App'

interface ButtonProps {
  block?: boolean
  onPress: () => void
  title: string | FormattedMessage.MessageDescriptor
}
export const Button: React.SFC<ButtonProps> = ({ block, onPress, title }) => (
  <BPButton type='button' onClick={onPress}>
    {typeof title === 'string'
      ? title
      : <FormattedMessage {...title} />
    }
  </BPButton>
)

export const Text: React.SFC = ({ children }) => (
  <span>{children}</span>
)

interface PickerProps {
  onValueChange: (itemValue: any) => void
  selectedValue?: any
}
export class Picker extends React.Component<PickerProps> {
  render () {
    return (
      <select
        value={this.props.selectedValue}
        onChange={(e) => this.props.onValueChange(e.currentTarget.value)}
      >
        {this.props.children}
      </select>
    )
  }
}

export namespace Picker {
  interface ItemProps {
    label: string
    value: any
  }
  export const Item: React.SFC<ItemProps> = (props) => (
    <option value={props.value}>{props.label}</option>
  )
}

export const Container = glamorous.div()
Container.displayName = 'Container'

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
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline'
}))
Row.displayName = 'Row'

export const Column = glamorous.div<ThemeProp>({}, ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}))
Column.displayName = 'Column'

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
