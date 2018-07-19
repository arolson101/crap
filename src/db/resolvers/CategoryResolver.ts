import { Column, Entity, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Field, InputType, ObjectType, Resolver } from './helpers'

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
}
