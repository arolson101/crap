import { Body, Icon, Label, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/actions/index'
import { SelectFieldItem } from '../../redux/actions/navActions'
import Picker from 'react-native-picker'
import rgba from 'color-rgba'

export namespace SelectField {
  export type Item = SelectFieldItem

  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    items: Item[]
    onValueChange?: (value: string | number) => any
    searchable?: boolean
  }
}

interface ComposedProps extends SelectField.Props, InjectedIntlProps {
  navPicker: actions['navPicker']
}

export class SelectFieldComponent extends React.Component<ComposedProps> {
  fieldApi: FieldAPI<any>

  render() {
    const { field, label, items, intl } = this.props

    return (
      <Field field={field}>
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
          const selectedItem = items.find(item => item.value === fieldApi.value)
          if (!selectedItem) {
            throw new Error(`selected item ${fieldApi.value} not found in item list`)
          }
          return (
            <ListItem
              button
              onPress={this.onPress}
            >
              <Label
                style={(error ? ({ color: platform.brandDanger }) : ({} as any))}
              >
                {intl.formatMessage(label)}
              </Label>
              <Body>
                <Text style={{ color: platform.textColor }}>
                  {selectedItem.label}
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

  onPress = () => {
    const { navPicker, items, searchable, label, intl } = this.props
    if (searchable) {
      navPicker({
        title: label,
        items,
        searchable,
        onValueChange: this.onValueChange,
        selectedItem: this.fieldApi.value,
      })
    } else {
      const data = items.map(item => item.label)
      const selectedItem = items.find(item => item.value === this.fieldApi.value)
      if (!selectedItem) {
        throw new Error(`selected item ${this.fieldApi.value} not found in item list`)
      }
      const selectedValue = selectedItem.label

      Picker.init({
        pickerData: data,
        selectedValue: [selectedValue],

        pickerFontColor: rgba(platform.defaultTextColor),
        pickerFontSize: platform.fontSizeBase,
        pickerBg: rgba(platform.datePickerBg),
        pickerToolBarBg: rgba(platform.toolbarDefaultBg),
        pickerTitleColor: rgba(platform.titleFontColor),
        pickerCancelBtnColor: rgba(platform.toolbarBtnTextColor),
        pickerConfirmBtnColor: rgba(platform.toolbarBtnTextColor),
        pickerCancelBtnText: 'cancel',
        pickerConfirmBtnText: 'ok',
        pickerTitleText: intl.formatMessage(label),

        onPickerConfirm: data => {
          const selectedItem = items.find(item => item.label === data[0])
          if (!selectedItem) {
            throw new Error(`selected item ${this.fieldApi.value} not found in item list`)
          }
          this.fieldApi.setValue(selectedItem.value)
        },
        onPickerCancel: data => {
          console.log(data)
        },
        onPickerSelect: data => {
          console.log(data)
        }
      })
      Picker.show()
    }
  }

  onValueChange = (value: string | number) => {
    const { onValueChange } = this.props
    this.fieldApi.setValue(value)
    if (onValueChange) {
      onValueChange(value)
    }
  }
}

export const SelectField = compose(
  injectIntl,
  connect(null, { navPicker: actions.navPicker })
)(SelectFieldComponent)
