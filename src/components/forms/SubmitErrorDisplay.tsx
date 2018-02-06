import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { Text } from 'react-native';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
}

const SubmitErrorDisplayComponent: React.SFC<Props & FormFieldProps> = ({ fieldApi }) => (
  fieldApi.getValue() ? (
    <Text style={formStyles.errorDisplay}>
      {fieldApi.getValue()}
    </Text>
  ) : null
);

export const SubmitErrorDisplay: React.ComponentType<Props> = FormField(SubmitErrorDisplayComponent);
