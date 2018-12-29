/* tslint:disable:no-duplicate-variable */
import * as web from './Form.web'
import * as native from './Form.native'

import { FormikConfig, FormikProps } from 'formik'

export interface FormProps<Values> extends FormikConfig<Values> {
  getApi?: (api: FormikProps<Values>) => any
  children: (props: FormikProps<Values>) => React.ReactNode
}

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Form.web'
