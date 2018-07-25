import { Body, Icon, Label, ListItem, Picker, Text, Item } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/actions/index'
import { SelectFieldItem } from '../../redux/actions/navActions'

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
    const { field, label, items, intl, searchable } = this.props

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
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <Label
                style={(error ? ({ color: platform.brandDanger }) : ({} as any))}
              >
                {intl.formatMessage(label)}
              </Label>
              <Body>
                {searchable
                  ? <Text style={{ color: platform.textColor }}>
                    {selectedItem.label}
                  </Text>
                  : <Picker
                    mode='dialog'
                    textStyle={{ flex: 1 }}
                    placeholder='placeholder'
                    placeholderStyle={{ flex: 1 }}
                    selectedValue={fieldApi.value}
                    onValueChange={fieldApi.setValue}
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
    const { navPicker, items, searchable, label, intl } = this.props
    if (searchable) {
      navPicker({
        title: label,
        items,
        searchable,
        onValueChange: this.onValueChange,
        selectedItem: this.fieldApi.value,
      })
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
