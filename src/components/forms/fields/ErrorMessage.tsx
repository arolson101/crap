import * as React from 'react';
import { Text } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props {
  error: Error | undefined;
}

export const ErrorMessage: React.SFC<Props> = ({ error }) => {
  if (error) {
    return <Text h4 style={formStyles.errorDisplay}>{error.message} </Text>;
  } else {
    return null;
  }
};
