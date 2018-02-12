import * as React from 'react';
import { FormField, FieldProps, FormFieldProps, FormErrors, FormApi } from 'react-form';
import { Text } from 'react-native';
import { formStyles } from './formStyles';

export namespace SubmitError {
  export interface Values {
    submitError?: string;
  }

  export const onSubmit = (formApi: FormApi) => {
    formApi.setValue('submitError', undefined);
  };
  
  type SubmitFailureCallback = (errors: FormErrors, formApi: FormApi) => any;
  
  export const onSubmitFailure: SubmitFailureCallback = ((errors: FormErrors, formApi: FormApi, error: Error) => {
    if (error) {
      formApi.setValue('submitError', error.message);
    }
  }) as any;  

  interface Props extends FieldProps {
  }
  
  const DisplayComponent: React.SFC<Props & FormFieldProps> = ({ fieldApi }) => (
    fieldApi.getValue() ? (
      <Text style={formStyles.errorDisplay}>
        {fieldApi.getValue()}
      </Text>
    ) : null
  );
  
  export const Field: React.ComponentType<Props> = FormField(DisplayComponent);
  export const Display = () => <Field field="submitError" />;
}
