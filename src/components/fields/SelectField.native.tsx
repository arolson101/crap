import { Icon, Item, Label, Picker, View, Header, Left, Body, Text, Title, Right } from 'native-base';
import platform from 'native-base/dist/src/theme/variables/platform';
import * as React from 'react';
import { Field } from 'react-form';
import { FormattedMessage, InjectedIntlProps, injectIntl, defineMessages } from 'react-intl';

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

export const SelectFieldComponent: React.SFC<SelectField.Props & InjectedIntlProps> =
  ({ field, label, items, onValueChange, intl }) => (
    <Field field={field}>
      {fieldApi => {
        const error = !!(fieldApi.touched && fieldApi.error)
        return (
          <Item
            error={error}
          >
            <Label
              // {...labelProps}
              style={(error ? ({ color: platform.brandDanger }) : ({} as any))}
            >
              {intl.formatMessage(label)}
            </Label>
            <View style={{ flex: 1 }}>
              <Picker
                // mode="dropdown"
                iosHeader={intl.formatMessage(label)}
                // iosIcon={<Icon name='arrow-dropdown-circle' style={{ color: '#007aff', fontSize: 25 }} />}
                style={{
                  width: '100%',
                  borderWidth: error ? 1 : undefined,
                  borderColor: error ? platform.brandDanger : undefined
                }}
                onValueChange={(value) => {
                  fieldApi.setValue(value)
                  if (onValueChange) {
                    onValueChange(value)
                  }
                }}
                headerBackButtonText={intl.formatMessage(messages.cancel)}
                selectedValue={fieldApi.value}
                // renderHeader={(backAction) => {
                //   return (
                //     <Header searchBar rounded>
                //       <Left/>
                //       <Body><Title>hi</Title></Body>
                //       <Right/>
                //     </Header>
                //   )
                // }}
              >
                {items.map(item =>
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                )}
              </Picker>
            </View>
            {error &&
              <Icon name='close-circle' />
            }
          </Item>
        )
      }}
    </Field>
  )

export const SelectField = injectIntl<SelectField.Props>(SelectFieldComponent)

const messages = defineMessages({
  cancel: {
    id: 'SelectField.cancel',
    defaultMessage: 'Cancel'
  }
})
