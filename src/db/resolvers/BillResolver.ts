import { Column, Entity, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Field, InputType, ObjectType, Resolver } from './helpers'

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
export class Bill extends RecordClass<Bill.Props> {
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
}
