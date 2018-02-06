import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { Picker } from 'react-native';
import { ListItem } from 'react-native-elements';
import { formStyles } from './formStyles';

export namespace SelectField {
  export interface Item {
    label: string;
    value: string | number;
  }
}

interface Props extends FieldProps {
  label: string;
  items: SelectField.Item[];
}

const SelectFieldComponent: React.SFC<Props & FormFieldProps> = ({fieldApi, label, items}) => (
  <ListItem
    wrapperStyle={formStyles.wrapperStyle}
    title={label}
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
);

export const SelectField: React.ComponentType<Props> = FormField(SelectFieldComponent);
