import glamorous from 'glamorous-native'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'
import { Item, Label, Input, Icon } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'

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

  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render () {
    const { field, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType } = this.props
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
              secureTextEntry={secure}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label
                {...labelProps}
                style={{ color: error ? platform.brandDanger : undefined }}
              >
                {intl.formatMessage(label)}
              </Label>
              <Input
                onChangeText={fieldApi.setValue}
                value={fieldApi.value}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={secure}
                numberOfLines={rows}
                multiline={(rows ? rows > 0 : undefined)}
                returnKeyType={returnKeyType}
                ref={(ref: any) => this.textInput = ref && ref._root}
                {...inputProps}
                // style={{color: textColor}}
              />
              {error &&
                <Icon name='close-circle' />
              }
            </Item>
          )
        }}
      </Field>
    )
  }
}
