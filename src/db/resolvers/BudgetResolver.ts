import { Column, Entity, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Field, InputType, ObjectType, Resolver } from './helpers'

@InputType()
class BudgetInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) sortOrder?: number
}

@ObjectType()
@Entity({ name: 'budgets' })
export class Budget extends RecordClass<Budget.Props> {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() name: string
  @Column() @Field() sortOrder: number
}

@Resolver(objectType => Budget)
export class BudgetResolver {
}

export namespace Budget {
  export interface Props extends Pick<BudgetInput, keyof BudgetInput> { }

  export type Query = iupdate.Query<Props>
}
