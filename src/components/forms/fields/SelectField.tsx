import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Picker } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { formStyles } from './formStyles';

export namespace SelectField {
  export interface Item {
    label: string;
    value: string | number;
  }
}

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  items: SelectField.Item[];
  leftIcon?: IconObject;
}

export const SelectField: React.ComponentType<Props> = FormField(injectIntl(
  ({ fieldApi, leftIcon, label, items, intl: { formatMessage } }: Props & FormFieldProps & InjectedIntlProps) => (
    <ListItem
      wrapperStyle={formStyles.wrapperStyle}
      leftIcon={leftIcon}
      title={formatMessage(label)}
      label={
        <Picker
          style={formStyles.picker}
          itemStyle={formStyles.pickerItem}
          onValueChange={fieldApi.setValue}
          selectedValue={fieldApi.getValue()}
        >
          {items.map(item =>
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          )}
        </Picker>
      }
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
    />
  )
));
