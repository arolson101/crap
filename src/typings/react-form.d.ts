import { FieldApi, FormApi, FormErrors } from 'react-form';

declare module 'react-form' {
  export interface FormFieldProps {
    fieldApi: FieldApi;
  }

  export interface FormProps {
    // onSubmitFailure?(errors: FormErrors, formApi: FormApi, error?: Error): void;
  }
}
