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
    noCorrect?: boolean
    inputRef?: any
  }
}

class TextFieldComponent extends React.Component<TextField.Props & InjectedIntlProps> {
  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render() {
    const { field, autoFocus, label, color, placeholder, secure,
      rows, onSubmitEditing, returnKeyType, intl, noCorrect } = this.props
    return (
      <Field field={field}>
        {fieldApi => {
          const error = !!(fieldApi.touched && fieldApi.error)
          const itemProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          const inputStyle = color ? { color } : {}
          return (
            <Item
              {...itemProps}
              error={error}
              secureTextEntry={secure}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label
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
                  ref={this.ref}
                />
                : <Input
                  style={{ flex: 1, ...inputStyle }}
                  onChangeText={fieldApi.setValue}
                  value={fieldApi.value.toString()}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={secure}
                  numberOfLines={rows}
                  autoCapitalize={noCorrect ? 'none' : undefined}
                  multiline={(rows ? rows > 0 : undefined)}
                  returnKeyType={returnKeyType}
                  ref={this.ref}
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

  ref = (ref: any) => {
    this.textInput = ref && ref._root
    if (this.props.inputRef) {
      this.props.inputRef(this.textInput)
    }
  }
}

export const TextField = injectIntl<TextField.Props>(TextFieldComponent)
