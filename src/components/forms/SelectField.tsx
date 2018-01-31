import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { Picker, TouchableWithoutFeedback, } from 'react-native';
import { FieldWrapper, FieldLabel, PickerControl } from './styledFields';

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

class SelectFieldComponent extends React.Component<Props & FormFieldProps> {
  picker: Picker;

  focusSelect = () => {
    if (this.picker) {
      // this.picker.focus();
    }
  }

  render() {
    const { fieldApi, label, items } = this.props;
    return (
      <FieldWrapper>
        <TouchableWithoutFeedback onPress={this.focusSelect}>
          <FieldLabel>{label}</FieldLabel>
        </TouchableWithoutFeedback>
        <PickerControl
          innerRef={(c) => this.picker = c}
          onValueChange={fieldApi.setValue}
          selectedValue={fieldApi.getValue()}
        >
          {this.props.items.map(item =>
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          )}
        </PickerControl>
      </FieldWrapper>
    );
  }
}

export const SelectField: React.ComponentType<Props> = FormField(SelectFieldComponent);
