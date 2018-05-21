import { Column, Entity, Index, PrimaryColumn } from 'typeorm/browser'
import { iupdate } from '../../iupdate'
import { Record, RecordClass } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

@InputType()
class CategoryInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) amount?: number
}

@ObjectType()
@Entity({ name: 'categories' })
export class Category extends RecordClass<Category.Props> {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() name: string
  @Column() @Field() amount: number
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
