import glamorous from 'glamorous-native'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'
import { Item, Label, Input, Icon } from 'native-base';

export namespace TextField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    secure?: boolean
    rows?: number
    textColor?: string
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: ReturnKeyType
  }
}

export class TextField extends React.Component<TextField.Props> {
  static contextTypes = ctx.intl

  private textInput = React.createRef<TextInput>()

  focusTextInput = () => {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  render () {
    const { field, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType } = this.props
    const { intl } = this.context as ctx.Intl
    return (
      <Field field={field}>
        {fieldApi => {
          const error = fieldApi.touched && fieldApi.error
          return (
            // <WrappedField label={label} fieldApi={fieldApi} onLabelPress={this.focusTextInput}>
              <Item
                stackedLabel
                error={!!error}
                // error={error}
                // autoFocus={autoFocus}
                // multiline={(rows ? rows > 0 : undefined)}
                // numberOfLines={rows}
                // onChangeText={fieldApi.setValue}
                // value={fieldApi.value}
                secureTextEntry={secure}
                placeholder={placeholder && intl.formatMessage(placeholder)}
                // onSubmitEditing={onSubmitEditing}
                // returnKeyType={returnKeyType}
                // innerRef={(current) => this.textInput = { current }}
                // textColor={textColor}
              >
                <Label>{intl.formatMessage(label)}</Label>
                <Input
                  onChangeText={fieldApi.setValue}
                  value={fieldApi.value}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={secure}
                  numberOfLines={rows}
                  multiline={(rows ? rows > 0 : undefined)}
                  returnKeyType={returnKeyType}
                  // ref={current => this.textInput = current._root}
                  style={{color: textColor}}
                />
              </Item>
            // </WrappedField>
          )
        }}
      </Field>
    )
  }
}
