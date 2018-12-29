import { Item, Right, Switch } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { Label } from './Label.native'
import { CheckboxFieldProps } from './CheckboxField'

export namespace CheckboxField {
  export type Props<Values> = CheckboxFieldProps<Values>
}

export const CheckboxField = <Values extends {}>({ field: name, label }: React.Props<any> & CheckboxFieldProps<Values>) => (
  <Field name={name}>
    {({ field, form }: FieldProps<Values>) => {
      const error = !!(form.touched[name] && form.errors[name])
      return (
        <Item
          inlineLabel
          error={error}
          style={styles.item}
        >
          <Label label={label} error={error} />
          <Right>
            <Switch
              onValueChange={(value: boolean) => form.setFieldValue(name, value)}
              value={field.value}
            />
          </Right>
        </Item>
      )
    }}
  </Field>
)

const styles = {
  item: {
    paddingTop: platform.listItemPadding,
    paddingBottom: platform.listItemPadding,
  }
}
