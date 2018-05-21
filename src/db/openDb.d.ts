import * as web from './openDb.web'
import * as native from './openDb.native'

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './openDb.web'
