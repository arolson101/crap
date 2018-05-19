import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

@InputType()
class CategoryInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) amount?: number
}

@ObjectType()
export class Category implements Category.Props, Record<Category.Props> {
  _deleted: number
  _base?: any
  _history?: any

  @Field() id: string
  @Field() name: string
  @Field() amount: number
}

@Resolver(objectType => Category)
export class CategoryResolver {
}

export namespace Category {
  export interface Props extends Pick<CategoryInput, keyof CategoryInput> { }

  export type Query = iupdate.Query<Props>
  export const table = 'categories'
  export const schema = Record.genSchema()
}
