import { Body, Icon, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { DatePickerAndroid } from 'react-native'
import { formatDate, makeDate } from '../../util/date'
import { DateFieldProps } from './DateField'
import { Label } from './Label.native'
import { FormikProps, Field, FieldProps } from 'formik'

export namespace DateField {
  export type Props<Values> = DateFieldProps<Values>
}

class DateFieldComponent<Values> extends React.Component<DateField.Props<Values> & InjectedIntlProps> {
  private form: FormikProps<Values>

  render() {
    const { field, label, intl, collapsed } = this.props
    if (collapsed) {
      return null
    }
    return (
      <Field field={field}>
        {({ field, form }: FieldProps<Values>) => {
          this.form = form
          const error = !!(form.touched[name] && form.errors[name])
          const itemProps = { onPress: this.onPress }
          return (
            <ListItem
              button
              {...itemProps}
            >
              <Label label={label} error={error} />
              <Body>
                <Text style={{ color: platform.textColor }}>
                  {formatDate(new Date(field.value))}
                </Text>
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

  onPress = async () => {
    try {
      const { field } = this.props
      const value = this.form.values[field] as any as string
      const { action, ...values } = await DatePickerAndroid.open({
        date: new Date(value)
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const value = makeDate(values)
        this.form.setFieldValue(field, value)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }
}

export const DateField = injectIntl(DateFieldComponent as any)
