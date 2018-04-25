import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { DbChange } from '../AppDatabase'

export interface Bank extends Bank.Props, Record<Bank.Props> {
}

export namespace Bank {
  export interface Props {
    readonly name: string
    readonly web: string
    readonly address: string
    readonly notes: string
    readonly favicon: string

    readonly online: boolean

    readonly fid: string
    readonly org: string
    readonly ofx: string

    readonly username: string
    readonly password: string
  }

  export type Query = iupdate.Query<Props>
  export const table = 'banks'
  export const schema = Record.genSchema()

  export namespace change {
    export const add = (t: number, bank: Bank): DbChange => ({
      table,
      t,
      adds: [bank]
    })

    export const edit = (t: number, id: string, q: Query): DbChange => ({
      table,
      t,
      edits: [{ id, q }]
    })

    export const remove = (t: number, id: string): DbChange => ({
      table,
      t,
      deletes: [id]
    })
  }

  export const defaultValues: Props = {
    name: '',
    web: '',
    address: '',
    notes: '',
    favicon: '',

    online: true,

    fid: '',
    org: '',
    ofx: '',

    username: '',
    password: ''
  }

  type Nullable<T> = { [K in keyof T]?: T[K] | undefined | null }

  export const diff = (bank: Bank, values: Nullable<Props>): Query => {
    return Object.keys(values).reduce(
      (q, prop): Query => {
        const val = values[prop]
        if (val !== bank[prop]) {
          return ({
            ...q,
            [prop]: { $set: val }
          })
        } else {
          return q
        }
      },
      {} as Query
    )
  }
}
