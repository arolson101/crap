/* tslint:disable:no-duplicate-variable */
import * as web from './Divider.web'
import * as native from './Divider.native'

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './Divider.web'
