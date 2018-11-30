import { Switch, FormGroup, Intent } from '@blueprintjs/core'
import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { intl } from 'src/intl'
import { CheckboxFieldProps } from './CheckboxField'

export namespace CheckboxField {
  export type Props<Values> = CheckboxFieldProps<Values>
}

export const CheckboxField = <Values extends {}>({ field: name, label }: React.Props<any> & CheckboxField.Props<Values>) => (
  <Field name={name}>
    {({ field, form }: FieldProps<Values>) => {
      const error = !!(form.touched[name] && form.errors[name])
      const id = `${name}-input`
      return (
        <FormGroup
          intent={error ? Intent.DANGER : undefined}
          helperText={error}
          label={intl.formatMessage(label)}
          labelFor={id}
        >
          <Switch
            className='pt-align-right'
            label={intl.formatMessage(label)}
            checked={field.value}
            onChange={e => form.setFieldValue(name, e.currentTarget.checked)}
          />
        </FormGroup>
      )
    }}
  </Field>
)
