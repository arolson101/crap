import * as web from './AppDb.web'
import * as native from './AppDb.native'

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './AppDb.web'
