import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

export interface Bill extends Bill.Props, Record<Bill.Props> {}

@InputType()
class BillInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) group?: string
  @Field({ nullable: true }) web?: string
  @Field({ nullable: true }) favicon?: string
  @Field({ nullable: true }) notes?: string
  @Field({ nullable: true }) amount?: number
  @Field({ nullable: true }) account?: string
  @Field({ nullable: true }) category?: string
  @Field({ nullable: true }) rruleString?: string
  @Field({ nullable: true }) showAdvanced?: boolean
}

@ObjectType()
export class Bill implements Record<Bill.Props> {
  _deleted: number
  _base?: any
  _history?: any

  @Field() id: string
  @Field() name: string
  @Field() group: string
  @Field() web: string
  @Field() favicon: string
  @Field() notes: string
  @Field() amount: number
  @Field() account: string
  @Field() category: string
  @Field() rruleString: string
  @Field() showAdvanced: boolean
}

@Resolver(objectType => Bill)
export class BillResolver {
}

export namespace Bill {
  export interface Props extends Pick<BillInput, keyof BillInput> { }
  export type Query = iupdate.Query<Props>
  export const table = 'bills'
  export const schema = Record.genSchema('account', 'category')
}
