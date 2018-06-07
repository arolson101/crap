import * as electron from './typeorm.electron'
import * as native from './typeorm.native'
import * as web from './typeorm.web'

// declare var _test: typeof electron
// declare var _test: typeof native
// declare var _test: typeof web

/// export to get the shape of the module
export * from './typeorm.electron'
