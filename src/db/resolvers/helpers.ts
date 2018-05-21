export { ResolverContext } from '../AppDbProvider'

export {
  Arg, Args, ArgsType, Ctx, InputType, Field, FieldResolver, Mutation,
  ObjectType, Query, Resolver, Root, registerEnumType
} from 'type-graphql/decorators'

export {
  ResolverInterface
} from 'type-graphql/interfaces'

import { SchemaGenerator } from 'type-graphql/schema/schema-generator'
import { BuildSchemaOptions } from 'type-graphql/utils/buildSchema'

// build this function manually (copied from type-graphql) to fix runtime error:
//   ./node_modules/type-graphql/helpers/loadResolversFromGlob.js
//   10:46-63 Critical dependency: the request of a dependency is an expression
export function buildSchemaSync (options: BuildSchemaOptions) {
  return SchemaGenerator.generateFromMetadataSync(options)
}

export const dbWrite = (...params: any[]) => undefined;
