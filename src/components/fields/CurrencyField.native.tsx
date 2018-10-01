import accounting from 'accounting'
import { Icon, Input, Item } from 'native-base'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { TextInput } from 'react-native'
import { CurrencyFieldProps } from './CurrencyField'
import { Label } from './Label.native'

export namespace CurrencyField {
  export type Props<T = {}> = CurrencyFieldProps
}

class CurrencyFieldComponent extends React.Component<CurrencyField.Props & InjectedIntlProps> {
  private textInput: TextInput
  private fieldApi: FieldAPI<any>

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render() {
    const { field, autoFocus, label, placeholder,
      onSubmitEditing, returnKeyType, intl } = this.props
    return (
      <Field field={field}>
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
          const itemProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          return (
            <Item
              {...itemProps}
              error={error}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label label={label} error={error} />
              <Input
                selectTextOnFocus
                style={{ flex: 1 }}
                onChangeText={fieldApi.setValue}
                value={fieldApi.value.toString()}
                onBlur={this.onBlur}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                keyboardType='numeric'
                ref={this.ref}
                {...inputProps}
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

  onBlur = () => {
    this.fieldApi.setValue(accounting.formatMoney(this.fieldApi.value))
  }

  ref = (ref: any) => {
    this.textInput = ref && ref._root
    if (this.props.inputRef) {
      this.props.inputRef(this.textInput)
    }
  }
}

export const CurrencyField = injectIntl<CurrencyField.Props>(CurrencyFieldComponent)
