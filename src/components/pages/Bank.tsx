import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router-dom';

interface Params {
  bankId: string;
}

interface Props extends RouteComponentProps<Params> {}

export const Bank: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text>bank id {props.match.params.bankId}</Text>
    </View>
  );
};
