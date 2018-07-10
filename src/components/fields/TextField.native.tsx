import { Icon, Input, Item, Label, Textarea } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'

export namespace TextField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    secure?: boolean
    rows?: number
    color?: string
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: ReturnKeyType
  }
}

class TextFieldComponent extends React.Component<TextField.Props & InjectedIntlProps> {
  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render () {
    const { field, autoFocus, label, color, placeholder, secure, rows, onSubmitEditing, returnKeyType, intl } = this.props
    return (
      <Field field={field}>
        {fieldApi => {
          const error = !!(fieldApi.touched && fieldApi.error)
          const labelProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          const inputStyle = color ? { color } : {}
          return (
            <Item
              // style={rows ? { minHeight: 20 * rows } : {}}
              error={error}
              secureTextEntry={secure}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label
                {...labelProps}
                style={(error
                  ? ({ color: platform.brandDanger })
                  : ({}) as any
                )}
              >
                {intl.formatMessage(label)}
              </Label>
              {rows && rows > 0
                ? <Textarea
                  style={{ flex: 1 }}
                  rowSpan={rows}
                  onChangeText={fieldApi.setValue}
                  value={fieldApi.value}
                  ref={(ref: any) => this.textInput = ref && ref._root}
                />
                : <Input
                  style={{ flex: 1, ...inputStyle }}
                  onChangeText={fieldApi.setValue}
                  value={fieldApi.value}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={secure}
                  numberOfLines={rows}
                  multiline={(rows ? rows > 0 : undefined)}
                  returnKeyType={returnKeyType}
                  ref={(ref: any) => this.textInput = ref && ref._root}
                  {...inputProps}
                />
              }
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

export const TextField = injectIntl<TextField.Props>(TextFieldComponent)
