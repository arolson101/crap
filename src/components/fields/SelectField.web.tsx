import { Button, Classes, MenuItem } from '@blueprintjs/core'
import { Suggest, ItemPredicate, ItemRenderer } from '@blueprintjs/select'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import glamorous from 'glamorous'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ctx, ThemeProp } from '../../App'
import { WrappedField } from './WrappedField'
import './SelectField.web.css'

// const StyledPicker = glamorous(Picker)({},
//   ({ error, theme }: ThemeProp & { error: any }) => ({
//     borderWidth: theme.boxBorderWidth,
//     borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor
//   })
// )
// StyledPicker.displayName = 'StyledPicker'

export namespace SelectField {
  export interface Item {
    label: string
    value: string | number
  }

  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    items: Item[]
    onValueChange?: (value: string | number) => any
  }
}

const ItemSuggest = Suggest.ofType<SelectField.Item>()

const filterItem: ItemPredicate<SelectField.Item> = (query, item) => {
  return item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

const renderItem: ItemRenderer<SelectField.Item> = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={item.value}
      // label={item.label}
      onClick={handleClick}
      text={item.label}
    />
  )
}

export const SelectField: React.SFC<SelectField.Props> =
  ({ field, label, items, onValueChange }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi => {
        const error = fieldApi.touched && fieldApi.error
        return (
          <WrappedField label={label} fieldApi={fieldApi}>
            <ItemSuggest
              popoverProps={{ minimal: true }}
              className='pt-fill'
              itemPredicate={filterItem}
              itemRenderer={renderItem}
              inputValueRenderer={item => item.label}
              items={items}
              // inputProps={{ value: items[fieldApi.value].label }}
              onItemSelect={(item) => {
                fieldApi.setValue(item.value)
                if (onValueChange) {
                  onValueChange(item.value)
                }
              }}
              // selectedValue={fieldApi.value}
            />
          </WrappedField>
        )
      }}
    </Field>
  )
SelectField.contextTypes = ctx.intl
