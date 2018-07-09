import { Item, Label, Right } from 'native-base'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Switch } from 'react-native'
import { ctx } from '../../App'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

const CheckboxFieldComponent: React.SFC<CheckboxField.Props & InjectedIntlProps> =
  ({ field, label, intl }) => (
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

export const CheckboxField = injectIntl(CheckboxFieldComponent)
