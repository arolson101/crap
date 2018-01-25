import * as React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { actions, RootState } from '../state';

interface Props {
  isPinging: boolean;
  pingPong: typeof actions.pingPong;
}

const PingTestComponent: React.SFC<Props> = ({isPinging, pingPong}) => {
  return (
    <Button onPress={pingPong} title={isPinging ? 'pinging' : 'ping'}/>
  );
};

export const PingTest = connect(
  (state: RootState) => ({ isPinging: state.ping.isPinging }),
  ({ pingPong: actions.pingPong })
)(PingTestComponent);
