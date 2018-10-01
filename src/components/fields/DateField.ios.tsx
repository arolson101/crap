import { Body, Icon, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { DatePickerIOS } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { formatDate, standardizeDate } from '../../util/date'
import { DateFieldProps } from './DateField'
import { Label } from './Label.native'

export namespace DateField {
  export type Props<T = {}> = DateFieldProps<T>
}

interface State {
  picking: boolean
}

class DateFieldComponent extends React.Component<DateField.Props & InjectedIntlProps, State> {
  private fieldApi: FieldAPI<any>

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
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
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
                    {formatDate(new Date(fieldApi.value))}
                  </Text>
                </Body>
                {error &&
                  <Icon name='close-circle' />
                }
              </ListItem>
              <Collapsible collapsed={this.state.picking}>
                <DatePickerIOS
                  mode='date'
                  date={new Date(fieldApi.value)}
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
    const value = standardizeDate(date)
    this.fieldApi.setValue(value)
    this.setState({ picking: false })
  }
}

export const DateField = injectIntl<DateField.Props>(DateFieldComponent)
