import { Column, Entity, Index, PrimaryColumn } from 'typeorm/browser'
import { iupdate } from '../../iupdate'
import { Record, RecordClass } from '../Record'
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
@Entity({ name: 'bills' })
export class Bill implements RecordClass<Bill.Props> {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() name: string
  @Column() @Field() group: string
  @Column() @Field() web: string
  @Column() @Field() favicon: string
  @Column() @Field() notes: string
  @Column() @Field() amount: number
  @Column() @Field() account: string
  @Column() @Field() category: string
  @Column() @Field() rruleString: string
  @Column() @Field() showAdvanced: boolean
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
