import { Field, FieldProps } from 'formik'
import { Icon, Input, Item, Textarea } from 'native-base'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { TextInput } from 'react-native'
import { Label } from './Label.native'
import { TextFieldProps } from './TextField'

export namespace TextField {
  export type Props<Values> = TextFieldProps<Values>
}

export class TextField<Values> extends React.Component<TextField.Props<Values>> {
  private textInput: TextInput

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render() {
    const { field: name, autoFocus, label, color, placeholder, secure,
      rows, onSubmitEditing, returnKeyType, noCorrect } = this.props
    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          const error = !!(form.touched[name] && form.error[name])
          const itemProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          const inputStyle = color ? { color } : {}
          return (
            <FormattedMessage {...placeholder}>
              {placeholderText =>
                <Item
                  {...itemProps}
                  error={error}
                  secureTextEntry={secure}
                  placeholder={placeholderText as string}
                >
                  <Label label={label} error={error} />
                  {rows && rows > 0
                    ? <Textarea
                      style={{ flex: 1 }}
                      rowSpan={rows}
                      onChangeText={value => form.setFieldValue(name, value)}
                      value={field.value}
                      ref={this.ref}
                    />
                    : <Input
                      style={{ flex: 1, ...inputStyle }}
                      onChangeText={value => form.setFieldValue(name, value)}
                      value={field.value.toString()}
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
              }
            </FormattedMessage>
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
