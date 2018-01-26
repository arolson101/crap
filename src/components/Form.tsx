import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Form } from 'react-form';

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

const FormTest: React.SFC = props => {
  return (
    <Form
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      {(formApi) =>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => formApi.setValue('email', text)}
              value={formApi.values.email || ''}
            />
          </View>
          <TouchableOpacity onPress={formApi.submitForm as any}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>
      }
    </Form>
  );
};

export default FormTest;
