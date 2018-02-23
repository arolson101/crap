import * as React from 'react';
import { connect } from 'react-redux';
import { SwitchProps, Switch } from 'react-router';
import { selectors, RootState } from '../state';

// like react-router's Switch, but it will subscribe to route changes and actually update
// see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md

const ConnectedSwitchComponent: React.SFC<SwitchProps> = ({children, ...props}) => {
  return (
    <Switch {...props}>
      {children}
    </Switch>
  );
};

export const ConnectedSwitch = connect(
  (state: RootState) => ({
    location: selectors.getLocation(state) || undefined,
  })
)(ConnectedSwitchComponent);
ConnectedSwitch.displayName = 'FixedSwitch';
