import { Field, FieldProps, FormikProps } from 'formik'
import accounting from 'accounting'
import { Icon, Input, Item } from 'native-base'
import * as React from 'react'
import { TextInput } from 'react-native'
import { CurrencyFieldProps } from './CurrencyField'
import { Label } from './Label.native'
import { intl } from 'src/intl'
// import { CalculatorInput } from 'react-native-calculator'

export namespace CurrencyField {
  export type Props<Values> = CurrencyFieldProps<Values>
}

export class CurrencyField<Values> extends React.Component<CurrencyField.Props<Values>> {
  private textInput: TextInput
  private form: FormikProps<Values>

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render() {
    const { field: name, autoFocus, label, placeholder,
      onSubmitEditing, returnKeyType } = this.props
    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          this.form = form
          const error = !!(form.touched[name] && form.errors[name])
          const itemProps = { onPress: this.focusTextInput }
          const inputProps = { autoFocus }
          return (
            <Item
              {...itemProps}
              error={error}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label label={label} error={error} />
              {/* <CalculatorInput
                prefix='$ '
                suffix=' USD'
                onChange={x => this.setState({ x })}
                value={fieldApi.value.toString()}
                // fieldTextStyle={{ fontSize: 24 }}
                // fieldContainerStyle={{ height: 36 }}
                // width={Dimensions.get('screen').width}
              /> */}
              <Input
                selectTextOnFocus
                style={{ flex: 1 }}
                onChangeText={form.handleChange(name)}
                value={field.value.toString()}
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
    const { field } = this.props
    const value = accounting.formatMoney(this.form.values[field] as any)
    this.form.setFieldValue(field, value)
  }

  ref = (ref: any) => {
    this.textInput = ref && ref._root
    if (this.props.inputRef) {
      this.props.inputRef(this.textInput)
    }
  }
}
