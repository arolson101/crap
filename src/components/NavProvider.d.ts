import * as web from './NavProvider.web'
import * as native from './NavProvider.native'

declare var _test: typeof web
declare var _test: typeof native

/// export to get the shape of the module
export * from './NavProvider.web'
