import * as electron from './openDb.electron'
import * as native from './openDb.native'
import * as web from './openDb.web'

declare var _test: typeof electron
declare var _test: typeof native
declare var _test: typeof web

/// export to get the shape of the module
export * from './openDb.electron'
