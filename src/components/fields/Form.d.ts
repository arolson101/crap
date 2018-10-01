/* tslint:disable:no-duplicate-variable */
import * as web from './Form.web'
import * as native from './Form.native'

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Form.web'
