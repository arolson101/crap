import * as React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import { formStyles } from './formStyles';

export const SubmitButton: React.SFC<ButtonProps> = (props) => (
  <Button {...props} style={[props.style, formStyles.button]} {...{primary1: true}} />
);
