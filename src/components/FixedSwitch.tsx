import * as React from 'react';
import { connect } from 'react-redux';
import { SwitchProps, Switch } from 'react-router';
import { selectors, RootState } from '../state';

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
