import { iupdate } from '../../iupdate'
import { Record } from '../Record'

export interface Category extends Category.Props, Record<Category.Props> {}

export namespace Category {
  export interface Props {
    name: string
    amount: number
  }

  export type Query = iupdate.Query<Props>
  export const table = 'categories'
  export const schema = Record.genSchema()
}
