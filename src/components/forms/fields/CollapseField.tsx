import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';

interface Props extends FieldProps, React.Props<{}> {
}

export const CollapseField: React.ComponentType<Props> = FormField(
  ({ fieldApi, children }: Props & FormFieldProps) => {
    if (fieldApi.getValue()) {
      return <>{children}</>;
    } else {
      return null;
    }
  }
);
