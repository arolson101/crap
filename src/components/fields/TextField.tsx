import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { FormField, FieldApi, FieldProps } from 'react-form';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  container: {

  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
});

interface Props extends FieldProps {
  label: string;
}

class TextFieldComponent extends React.Component<Props & {fieldApi: FieldApi}> {
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
        <View style={{flexDirection: 'row'}}>
          <Text>{label}</Text>
          <TextInput
            ref={(c) => this.textInput = c as any}
            style={styles.input}
            onChangeText={(text) => fieldApi.setValue(text)}
            value={fieldApi.getValue()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const TextField: React.ComponentType<Props> = FormField(TextFieldComponent);
export default TextField;
