import { Field, FieldProps } from 'formik'
import { Icon, Input, Item, Textarea } from 'native-base'
import * as React from 'react'
import { TextInput } from 'react-native'
import { Label } from './Label.native'
import { TextFieldProps } from './TextField'
import { intl } from 'src/intl'

export namespace TextField {
  export type Props<Values> = TextFieldProps<Values>
}

export class TextField<Values> extends React.Component<TextField.Props<Values>> {
  private textInput = React.createRef<TextInput & Textarea>()

  focusTextInput = () => {
    const ref: any = this.textInput.current
    if (ref && ref._root) {
      ref._root.focus()
    }
  }

  render() {
    const { field: name, autoFocus, label, color, placeholder, secure,
      rows, onSubmitEditing, returnKeyType, noCorrect } = this.props
    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          const error = !!(form.touched[name] && form.errors[name])
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
              <Label label={label} error={error} />
              {rows && rows > 0
                ? <Textarea
                  style={{ flex: 1 }}
                  rowSpan={rows}
                  onChangeText={form.handleChange(name)}
                  value={field.value}
                  ref={this.textInput}
                />
                : <Input
                  style={{ flex: 1, ...inputStyle }}
                  onChangeText={form.handleChange(name)}
                  value={field.value.toString()}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={secure}
                  numberOfLines={rows}
                  autoCapitalize={noCorrect ? 'none' : undefined}
                  multiline={(rows ? rows > 0 : undefined)}
                  returnKeyType={returnKeyType}
                  ref={this.textInput}
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
