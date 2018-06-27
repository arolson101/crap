declare module 'react-form' {
  export type FieldValue = string | number | boolean
  export type FieldSpecElement = string | number
  export type FieldSpecArray = Array<FieldSpecElement>
  export type FieldSpec = FieldSpecArray | string
  export interface FormValues {
    [key: string]: FieldValue
  }

  export interface FormErrors {
    [key: string]: string | undefined | null
  }

  export interface FormTouched {
    [key: string]: boolean
  }

  export interface FormState<V = FormValues> {
    values: V
    errors: FormErrors
    nestedErrors: FormErrors
    touched: FormTouched
  }

  export interface FormPropsBase<V = FormValues, P = FormProps> {
    defaultValues?: Partial<V>
    loadState?: (props: P, instance: FormAPI) => FormState | undefined
    preValidate?: (values: V, state: FormState, props: P, instance: FormAPI) => V
    validate?: (values: V, state: FormState, props: P, instance: FormAPI) => FormErrors
    onValidationFail?: (values: V, state: FormState, props: P, instance: FormAPI) => void
    onChange?: (state: FormState, props: P, initial: boolean, instance: FormAPI) => void
    saveState?: (state: FormState, props: P, instance: FormAPI) => void
    willUnmount?: (state: FormState, props: P, instance: FormAPI) => void
    preSubmit?: (values: V, state: FormState, props: P, instance: FormAPI) => V
    onSubmit?: (values: V, state: FormState, props: P, instance: FormAPI) => void
    postSubmit?: (values: V, state: FormState, props: P, instance: FormAPI) => void
    component?: string | false | React.ComponentType<any>
    render?: (props: FormAPI<V>) => React.ReactNode
  }

  export interface FormProps<V = FormValues> extends FormPropsBase<V> {
    children?: (props: FormAPI<V>) => React.ReactNode
  }

  interface BaseFormAPI<V = FormValues> extends FormState<V> {
    setAllValues: (values: V, noTouch?: boolean) => void
    setAllTouched: (value?: boolean) => void
    resetForm: () => void
    submitForm: () => void
  }

  export interface FormAPI<V = FormValues> extends BaseFormAPI<V> {
    setValue: <K extends keyof V>(field: K, value: V[K], noTouch?: boolean) => void
    getValue: <T extends FieldValue>(field: FieldSpec) => T | undefined
    setNestedError: (field: FieldSpec, value: FieldValue) => void
    getError: (field: FieldSpec) => string | undefined
    setTouched: (field: FieldSpec, value?: boolean) => void
    getTouched: (field: FieldSpec) => boolean
    addValue: <T = any>(field: FieldSpec, value: T) => void
    removeValue: (field: FieldSpec, index: number) => void
    swapValues: (field: FieldSpec, i: number, j: number) => void
  }

  export interface BoundFormAPI<V = FormValues> extends BaseFormAPI<V> {
    setValue: (value: FieldValue, noTouch?: boolean) => void
    getValue: <T extends FieldValue>() => T | undefined
    setNestedError: (value: FieldValue) => void
    getError: () => string | undefined
    setTouched: (value?: boolean) => void
    getTouched: () => boolean
    addValue: <T extends FieldValue>(value: T) => void
    removeValue: (index: number) => void
    swapValues: (i: number, j: number) => void
  }

  export class Form extends React.Component<FormProps> {
    static childContextTypes: any
  }

  export interface ComponentBaseProps {
    field: string
    showErrors?: boolean
    errorBefore?: boolean
    noTouch?: boolean
    onBlur?: Function
    onChange?: Function
  }

  export interface FieldProps extends FormPropsBase<any> {
    field: string
    children?: (fieldApi: FieldAPI<any>) => React.ReactNode
  }

  export class Field extends React.Component<FieldProps> {
  }

  export interface FieldAPI<T> {
    value: T
    error: string | undefined
    warning: string | undefined
    success: string | undefined
    touched: boolean
    fieldName: string
    setValue: (value: T) => void
    setError: (value: string) => void
    setWarning: (value: string) => void
    setSuccess: (value: string) => void
    setTouched: (value?: boolean) => void
  }

  export interface FormFieldProps extends ComponentBaseProps {
    field: string
    fieldApi: BoundFormAPI
  }
  export interface FieldComponentProps {
    fieldApi: BoundFormAPI
  }
  export function FormField (component: React.ComponentType): React.ComponentClass

  export interface TextProps extends ComponentBaseProps {}
  export class Text extends React.Component<TextProps> {}

  export type FormContext = {}
}
