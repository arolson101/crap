import { iupdate } from '../../iupdate'
import { Record } from '../Record'
export { Arg, Args, ArgsType, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, registerEnumType, Resolver, Root } from 'type-graphql/decorators'
export { ResolverInterface } from 'type-graphql/interfaces'

export interface DbRecordEdit {
  id: string
  q: iupdate.Query<{}>
}

type Table = any

export interface DbChange {
  table: Table
  t: number
  adds?: Record<any>[]
  deletes?: string[]
  edits?: Array<DbRecordEdit>
}
