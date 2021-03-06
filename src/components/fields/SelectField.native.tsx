import { Field, FieldProps, FormikProps } from 'formik'
import { Body, Icon, ListItem, Picker, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { compose } from 'recompose'
import { intl } from 'src/intl'
import { InjectedNavProps, withNav } from '../NavContext'
import { Label } from './Label.native'
import { SelectFieldItem, SelectFieldProps } from './SelectField'

export namespace SelectField {
  export type Item = SelectFieldItem
  export type Props<Values> = SelectFieldProps<Values>
}

interface ComposedProps<Values> extends SelectField.Props<Values>, InjectedNavProps {
}

export class SelectFieldComponent<Values> extends React.Component<ComposedProps<Values>> {
  private form: FormikProps<Values>

  render() {
    const { field: name, label, items, searchable } = this.props

    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          this.form = form
          const error = !!(form.touched[name] && form.errors[name])
          const selectedItem = items.find(item => item.value === field.value)
          if (!selectedItem) {
            throw new Error(`selected item ${field.value} not found in item list`)
          }
          return (
            <ListItem
              button
              onPress={this.onPress}
              style={searchable ? {} : { paddingTop: 0, paddingBottom: 0 }}
            >
              <Label label={label} error={error} />
              <Body>
                {searchable
                  ? <Text style={{ color: platform.textColor }}>
                    {selectedItem.label}
                  </Text>
                  : <Picker
                    mode='dialog'
                    iosHeader={intl.formatMessage(label)}
                    textStyle={{ flex: 1 }}
                    placeholder='placeholder'
                    placeholderStyle={{ flex: 1 }}
                    selectedValue={field.value}
                    onValueChange={form.handleChange(name)}
                  >
                    {items.map(item =>
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    )}
                  </Picker>
                }

              </Body>
              {error &&
                <Icon name='close-circle' />
              }
            </ListItem>
          )
        }}
      </Field>
    )
  }

  onPress = () => {
    const { navPicker, items, searchable, label, field } = this.props
    if (searchable) {
      navPicker({
        title: label,
        items,
        searchable,
        onValueChange: this.onValueChange,
        selectedItem: this.form.values[field] as any,
      })
    }
  }

  onValueChange = (value: string | number) => {
    const { onValueChange, field } = this.props
    this.form.setFieldValue(field, value)
    if (onValueChange) {
      onValueChange(value)
    }
  }
}

export const SelectField = compose(
  withNav,
)(SelectFieldComponent)
