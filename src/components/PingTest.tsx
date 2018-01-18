import * as React from 'react';
import { connect } from 'react-redux';
import { actions, RootState } from '../redux';

interface Props {
  isPinging: boolean;
  ping: () => any;
}

const PingTestComponent: React.SFC<Props> = ({isPinging, ping}) => {
  return (
    <button onClick={ping}>{isPinging ? 'pinging' : 'ping'}</button>
  );
};

export const PingTest = connect(
  (state: RootState) => ({ isPinging: state.ping.isPinging }),
  ({ ping: actions.ping })
)(PingTestComponent);
