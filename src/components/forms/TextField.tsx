import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { TextInput, TouchableWithoutFeedback, } from 'react-native';
import { FieldWrapper, FieldLabel, TextControl } from './styledFields';

interface Props extends FieldProps {
  label: string;
}

class TextFieldComponent extends React.Component<Props & FormFieldProps> {
  textInput: TextInput;

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    const { fieldApi, label } = this.props;
    return (
      <FieldWrapper>
        <TouchableWithoutFeedback onPress={this.focusTextInput}>
          <FieldLabel>{label}</FieldLabel>
        </TouchableWithoutFeedback>
        <TextControl
          innerRef={(c) => this.textInput = c}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
        />
      </FieldWrapper>
    );
  }
}

export const TextField: React.ComponentType<Props> = FormField(TextFieldComponent);
