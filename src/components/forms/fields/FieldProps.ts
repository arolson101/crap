import { FormFieldProps, FieldProps as RFFieldProps } from 'react-form';
const RFFormField = require('react-form').withFormApi;

export { FormFieldProps };

export interface FieldProps<T> extends RFFieldProps {
  field: keyof T;
}

type FormFieldT = <T>(component: React.ComponentType<any>) => React.ComponentClass<T>;
export const FormField = RFFormField as FormFieldT;
