import * as React from 'react';
import { glamorous, ThemeProp } from './Theme';

const Text = glamorous.text({}, ({ theme }: ThemeProp) => ({
  color: theme.errorTextColor,
  margin: 20,
}));

interface Props {
  error: Error | undefined;
}

export const ErrorMessage: React.SFC<Props> = ({ error }) => {
  if (error) {
    return <Text>{error.message}</Text>;
  } else {
    return null;
  }
};
