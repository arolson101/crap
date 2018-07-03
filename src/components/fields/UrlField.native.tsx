import glamorous from 'glamorous-native'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'
import { Item, Label, Input } from 'native-base'

export namespace UrlField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: ReturnKeyType
  }
}

export class UrlField extends React.Component<UrlField.Props> {
  static contextTypes = ctx.intl

  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render () {
    const { field, autoFocus, label, placeholder, onSubmitEditing, returnKeyType } = this.props
    const { intl } = this.context as ctx.Intl
    return (
      <Field field={field}>
        {fieldApi => {
          const error = !!(fieldApi.touched && fieldApi.error)
          const labelProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          return (
            <Item
              inlineLabel
              error={error}
              {...inputProps}
              // error={error}
              // autoFocus={autoFocus}
              // multiline={(rows ? rows > 0 : undefined)}
              // numberOfLines={rows}
              // onChangeText={fieldApi.setValue}
              // value={fieldApi.value}
              placeholder={placeholder && intl.formatMessage(placeholder)}
              // onSubmitEditing={onSubmitEditing}
              // innerRef={(current) => this.textInput = { current }}
              // textColor={textColor}
            >
              <Label {...labelProps}>{intl.formatMessage(label)}</Label>
              <Input
                onChangeText={fieldApi.setValue}
                value={fieldApi.value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                ref={(ref: any) => this.textInput = ref && ref._root}
                // style={{color: textColor}}
              />
            </Item>
          )
        }}
      </Field>
    )
  }
}
