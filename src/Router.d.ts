import * as web from "./Router.web";
import * as native from "./Router.native";

declare var _test: typeof web;
declare var _test: typeof native;

/// export to get the shape of the module
export * from "./Router.web";
