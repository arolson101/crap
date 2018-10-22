import { Body, Icon, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormikProps, Field, FieldProps } from 'formik'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { DatePickerIOS } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { formatDate, standardizeDate } from '../../util/date'
import { DateFieldProps } from './DateField'
import { Label } from './Label.native'

export namespace DateField {
  export type Props<Values> = DateFieldProps<Values>
}

interface State {
  picking: boolean
}

class DateFieldComponent<Values> extends React.Component<DateField.Props<Values> & InjectedIntlProps> {
  private form: FormikProps<Values>

  state: State = {
    picking: false
  }

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
          const colorStyle = {
            ...(this.state.picking ? { color: platform.brandPrimary } : {}),
            ...(error ? { color: platform.brandDanger } : {}),
          }
          return (
            <>
              <ListItem
                button
                {...itemProps}
              >
                <Label label={label} error={error} />
                <Body>
                  <Text style={{ color: platform.textColor, ...colorStyle }}>
                    {formatDate(new Date(field.value))}
                  </Text>
                </Body>
                {error &&
                  <Icon name='close-circle' />
                }
              </ListItem>
              <Collapsible collapsed={this.state.picking}>
                <DatePickerIOS
                  mode='date'
                  date={new Date(field.value)}
                  onDateChange={this.onDateChange}
                />
              </Collapsible>
            </>
          )
        }}
      </Field>
    )
  }

  onPress = () => {
    this.setState({ picking: !this.state.picking })
  }

  onDateChange = (date: Date) => {
    const { field } = this.props
    const value = standardizeDate(date)
    this.form.setFieldValue(field, value)
    this.setState({ picking: false })
  }
}

export const DateField = injectIntl(DateFieldComponent as any)
