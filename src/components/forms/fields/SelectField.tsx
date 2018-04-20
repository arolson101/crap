import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Picker } from 'react-native';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';
import { WrappedField } from './WrappedField';

export namespace SelectField {
  export interface Item {
    label: string;
    value: string | number;
  }

  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    items: SelectField.Item[];
    onValueChange?: (value: string | number) => any;
  }
}

const SelectFieldComponent: React.SFC<SelectField.Props & FormFieldProps> =
  ({ fieldApi, label, items, onValueChange }, { intl }: ctx.Intl) => (
    <WrappedField label={label} fieldApi={fieldApi}>
      <Picker
        style={[
          formStyles.control,
          formStyles.picker
        ]}
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
    </WrappedField>
  );
SelectFieldComponent.contextTypes = ctx.intl;

export const SelectField = FormField<SelectField.Props>(SelectFieldComponent);
SelectField.displayName = 'SelectField';
