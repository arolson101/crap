import * as React from 'react';
import { connect } from 'react-redux';
import { SwitchProps, Switch } from 'react-router';
import { selectors, RootState } from '../state';

// like react-router's Switch, but it will subscribe to route changes and actually update
// see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md

export const FixedSwitchComponent: React.SFC<SwitchProps> = ({children, ...props}) => {
  return (
    <Switch {...props}>
      {children}
    </Switch>
  );
};

export const FixedSwitch = connect(
  (state: RootState) => ({
    location: selectors.getLocation(state) || undefined,
  })
)(FixedSwitchComponent);
FixedSwitch.displayName = 'FixedSwitch';
