import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

@InputType()
class BudgetInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) sortOrder?: number
}

@ObjectType()
export class Budget implements Record<Budget.Props> {
  _deleted: number
  _base?: any
  _history?: any

  @Field() id: string
  @Field() name: string
  @Field() sortOrder: number
}

@Resolver(objectType => Budget)
export class BudgetResolver {
}

export namespace Budget {
  export interface Props extends Pick<BudgetInput, keyof BudgetInput> { }

  export type Query = iupdate.Query<Props>
  export const table = 'budgets'
  export const schema = Record.genSchema('*categories')
}
