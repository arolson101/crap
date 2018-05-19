export { ResolverContext } from '../AppDbProvider'

export {
  Arg, Args, ArgsType, Ctx, InputType, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root
} from 'type-graphql/decorators'

export {
  ResolverInterface
} from 'type-graphql/interfaces'

import { BuildSchemaOptions } from 'type-graphql/utils/buildSchema'
import { SchemaGenerator, SchemaGeneratorOptions } from 'type-graphql/schema/schema-generator'

// build this function manually (copied from type-graphql) to fix runtime error:
//   ./node_modules/type-graphql/helpers/loadResolversFromGlob.js
//   10:46-63 Critical dependency: the request of a dependency is an expression
export function buildSchemaSync (options: BuildSchemaOptions) {
  return SchemaGenerator.generateFromMetadataSync(options)
}
