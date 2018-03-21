import * as React from 'react';
import { Text } from 'react-native';
import { formStyles } from './formStyles';

interface Props {
  error: Error | undefined;
}

export const ErrorMessage: React.SFC<Props> = ({ error }) => {
  if (error) {
    return <Text style={formStyles.errorDisplay}>{error.message} </Text>;
  } else {
    return null;
  }
};
