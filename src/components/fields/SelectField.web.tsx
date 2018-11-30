import { FormGroup, Intent, MenuItem } from '@blueprintjs/core'
import { ItemPredicate, ItemRenderer, Suggest } from '@blueprintjs/select'
import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { intl } from 'src/intl'
import { SelectFieldItem, SelectFieldProps } from './SelectField'

import '@blueprintjs/select/lib/css/blueprint-select.css'
import './SelectField.web.css'

export namespace SelectField {
  export type Item = SelectFieldItem
  export type Props<Values> = SelectFieldProps<Values>
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

export class SelectField<Values> extends React.Component<SelectField.Props<Values>> {
  render() {
    const { field: name, label, items, onValueChange } = this.props
    const id = `${name}-input`
    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          const error = !!(form.touched[name] && form.errors[name])
          return (
            <FormGroup
              intent={error ? Intent.DANGER : undefined}
              helperText={error}
              label={intl.formatMessage(label)}
              labelFor={id}
            >
              <ItemSuggest
                popoverProps={{ minimal: true }}
                className='pt-fill'
                itemPredicate={filterItem}
                itemRenderer={renderItem}
                inputValueRenderer={item => item.label}
                items={items}
                // inputProps={{ value: items[fieldApi.value].label }}
                onItemSelect={(item) => {
                  form.setFieldValue(name, item.value)
                  if (onValueChange) {
                    onValueChange(item.value)
                  }
                }}
              // selectedValue={fieldApi.value}
              />
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}
