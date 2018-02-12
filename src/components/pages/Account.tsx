import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router-dom';

interface Params {
  accountId: string;
}

interface Props extends RouteComponentProps<Params> {}

export const Account: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text>account id {props.match.params.accountId}</Text>
    </View>
  );
};
