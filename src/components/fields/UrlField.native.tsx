import { Input, Item, Label } from 'native-base'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'

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

class UrlFieldComponent extends React.Component<UrlField.Props & InjectedIntlProps> {
  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render () {
    const { field, intl, autoFocus, label, placeholder, onSubmitEditing, returnKeyType } = this.props
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

export const UrlField = injectIntl<UrlField.Props>(UrlFieldComponent)
