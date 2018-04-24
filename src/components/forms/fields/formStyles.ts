import { StyleSheet } from 'react-native';
import glamorous from 'glamorous-native';

interface Props {
  noPadding?: boolean,
  theme: { color: string }
}

const MyStyledDiv = glamorous.view<Props>(
  {
    margin: 1,
  },
  ({noPadding, theme}) => ({
    padding: noPadding ? 0 : 4,
    color: theme.color,
  })
);

export const formStyles = StyleSheet.create({
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'silver',
    fontSize: 20,
  },
  pickerItem: {
    justifyContent: 'flex-end',
  },
  errorDisplay: {
    color: 'red',
    margin: 20,
  },
});
