import { iupdate } from '../../iupdate'
import { Record } from '../Record'

export interface Budget extends Budget.Props, Record<Budget.Props> {}

export namespace Budget {
  export interface Props {
    readonly name: string
    readonly sortOrder: number
  }

  export type Query = iupdate.Query<Props>
  export const table = 'budgets'
  export const schema = Record.genSchema('*categories')
}
