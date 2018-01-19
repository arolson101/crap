import * as React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { actions, RootState } from '../state';

interface Props {
  isPinging: boolean;
  ping: () => any;
}

const PingTestComponent: React.SFC<Props> = ({isPinging, ping}) => {
  return (
    <Button onPress={ping} title={isPinging ? 'pinging' : 'ping'}/>
  );
};

export const PingTest = connect(
  (state: RootState) => ({ isPinging: state.ping.isPinging }),
  ({ ping: actions.ping })
)(PingTestComponent);
