import { Item, Right, Switch } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Label } from './Label.native'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

export const CheckboxField: React.SFC<CheckboxField.Props> =
  ({ field, label }) => (
    <Field field={field}>
      {fieldApi => {
        const error = !!(fieldApi.touched && fieldApi.error)
        return (
          <Item
            inlineLabel
            error={error}
            style={styles.item}
          >
            <Label label={label} error={error} />
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

const styles = StyleSheet.create({
  item: {
    paddingTop: platform.listItemPadding,
    paddingBottom: platform.listItemPadding,
  }
})
