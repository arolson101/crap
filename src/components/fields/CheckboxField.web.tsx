import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Switch } from '@blueprintjs/core'
import { WrappedField } from './WrappedField'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

const CheckboxFieldComponent: React.SFC<CheckboxField.Props & InjectedIntlProps> =
  ({ field, label, intl }) => (
    <Field field={field}>
      {fieldApi => (
          <WrappedField fieldApi={fieldApi}>
            <Switch
              className='pt-align-right'
              label={intl.formatMessage(label)}
              checked={fieldApi.value}
              onChange={e => fieldApi.setValue(e.currentTarget.checked)}
            />
          </WrappedField>
        )
      }
    </Field>
  )

export const CheckboxField = injectIntl<CheckboxField.Props>(CheckboxFieldComponent)
