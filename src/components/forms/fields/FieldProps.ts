import { FormField as RFFormField, FormFieldProps, FieldProps as RFFieldProps } from 'react-form'

export { FormFieldProps }

export interface FieldProps<T> extends RFFieldProps {
  field: keyof T
}

type FormFieldT = <T>(component: React.ComponentType<any>) => React.ComponentClass<T>
export const FormField = RFFormField as FormFieldT
