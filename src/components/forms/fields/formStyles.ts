import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'Gainsboro',
    fontSize: 20,
  },
  pickerItem: {
    justifyContent: 'flex-end',
  },
  errorSubtitle: {
    color: 'red',
  },
  errorDisplay: {
    color: 'red',
    margin: 20,
  },
  wrapper: {
    flexDirection: 'column',
    minHeight: 28,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    width: 100,
    fontSize: 16,
    color: '#404040',
  },
  control: {
    flex: 3
  },
  switch: {
    flex: 0,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'Gainsboro',
    fontSize: 20,
  },
  button: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 40,
  },
});
