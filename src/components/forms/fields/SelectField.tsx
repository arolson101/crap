import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { FormattedMessage } from 'react-intl';
import { Picker } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
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
  onValueChange?: (value: string | number) => any;
}

const SelectFieldComponent: React.SFC<Props & FormFieldProps> =
  ({ fieldApi, leftIcon, label, items, onValueChange }, { intl }: ctx.Intl) => (
    <ListItem
      wrapperStyle={formStyles.wrapperStyle}
      leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      label={
        <Picker
          style={formStyles.picker}
          itemStyle={formStyles.pickerItem}
          onValueChange={(value) => {
            fieldApi.setValue(value);
            if (onValueChange) {
              onValueChange(value);
            }
          }}
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
  );
SelectFieldComponent.contextTypes = ctx.intl;

export const SelectField = FormField(SelectFieldComponent) as React.ComponentClass<Props>;
SelectField.displayName = 'SelectField';
