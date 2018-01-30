import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { TextInput, TouchableWithoutFeedback, } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  margin: 5px;
  align-items: center;
`;

const Label = styled.Text`
  margin-left: 10px;
  text-align: right;
  color: gray;
`;

const Input = styled.TextInput`
  flex: 5;
  height: 35px;
  margin-left: 10px;
  border-color: lightgray;
  border-width: 1px;
  padding: 5px;
`;

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
      <TouchableWithoutFeedback onPress={this.focusTextInput}>
        <Container>
          <Label>{label}</Label>
          <Input
            innerRef={(c) => this.textInput = c}
            onChangeText={(text) => fieldApi.setValue(text)}
            value={fieldApi.getValue()}
          />
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const TextField: React.ComponentType<Props> = FormField(TextFieldComponent);
export default TextField;
