import { Item, Label, Right } from 'native-base'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { Switch } from 'react-native'
import { ctx } from '../../App'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

export const CheckboxField: React.SFC<CheckboxField.Props> =
  ({ field, label }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi => {
        const error = !!(fieldApi.touched && fieldApi.error)
        return (
          <Item
            inlineLabel
            error={error}
          >
            <Label>{intl.formatMessage(label)}</Label>
            <Right>
            <Switch
              onValueChange={(value: boolean) => fieldApi.setValue(value)}
              value={fieldApi.value}
            />
            </Right>
          </Item>
        )
      }}
    </Field>
  )
CheckboxField.contextTypes = ctx.intl
