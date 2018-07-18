import { Icon, ListItem, Label, Picker, View, Text, Right, Item, Input, Button } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/index';
import { SelectFieldItem } from '../../redux/actions/navActions';

export namespace SelectField {
  export type Item = SelectFieldItem

  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    items: Item[]
    onValueChange?: (value: string | number) => any
    navPicker: actions['navPicker']
  }
}

export class SelectFieldComponent extends React.Component<SelectField.Props & InjectedIntlProps> {
  fieldApi: FieldAPI<any>

  render () {
    const { field, label, items, onValueChange, intl } = this.props
    const itemProps = { onPress: this.onPress }

    return (
      <Field field={field}>
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
          return (
            <Item
              error={error}
              {...itemProps}
            >
              <Label
                style={(error ? ({ color: platform.brandDanger }) : ({} as any))}
              >
                {intl.formatMessage(label)}
              </Label>
              <Button transparent style={{ flex: 1 }} onPress={this.onPress}>
                <Text style={{color: platform.textColor}}>{items[fieldApi.value || 0].label}</Text>
              </Button>
              {error &&
                <Icon name='close-circle' />
              }
          </Item>
          )
        }}
      </Field>
    )
  }

  onPress = () => {
    const { navPicker, items } = this.props
    console.log('onPress', this.props)
    navPicker({
      title: messages.title,
      items,
      onValueChange: this.onValueChange,
      selectedItem: this.fieldApi.value,
    })
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

const messages = defineMessages({
  title: {
    id: 'SelectField.native.title',
    defaultMessage: 'title'
  }
})
