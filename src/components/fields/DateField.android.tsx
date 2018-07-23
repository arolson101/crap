import { Body, Icon, Label, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { DatePickerAndroid } from 'react-native'
import { formatDate, makeDate } from '../../util/date'
import { DateFieldProps } from './DateField'

export namespace DateField {
  export type Props<T = {}> = DateFieldProps<T>
}

class DateFieldComponent extends React.Component<DateField.Props & InjectedIntlProps> {
  private fieldApi: FieldAPI<any>

  render() {
    const { field, label, intl, collapsed } = this.props
    if (collapsed) {
      return null
    }
    return (
      <Field field={field}>
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
          const itemProps = { onPress: this.onPress }
          console.log('datefield', { value: fieldApi.value })
          return (
            <ListItem
              button
              {...itemProps}
            >
              <Label
                style={(error ? ({ color: platform.brandDanger }) : ({}) as any)}
              >
                {intl.formatMessage(label)}
              </Label>
              <Body>
                <Text style={{ color: platform.textColor }}>
                  {formatDate(new Date(fieldApi.value))}
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
      const { action, ...values } = await DatePickerAndroid.open({
        date: new Date(this.fieldApi.value)
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const value = makeDate(values)
        this.fieldApi.setValue(value)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }
}

export const DateField = injectIntl<DateField.Props>(DateFieldComponent)
