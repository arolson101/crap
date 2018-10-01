import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { DbChange, Field, InputType, ObjectType } from './helpers'

@InputType()
export class BankInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) web?: string
  @Field({ nullable: true }) address?: string
  @Field({ nullable: true }) notes?: string
  @Field({ nullable: true }) favicon?: string

  @Field({ nullable: true }) online?: boolean

  @Field({ nullable: true }) fid?: string
  @Field({ nullable: true }) org?: string
  @Field({ nullable: true }) ofx?: string

  @Field({ nullable: true }) username?: string
  @Field({ nullable: true }) password?: string
}

@ObjectType()
@Entity({ name: 'banks' })
export class Bank extends RecordClass<Bank> implements Bank.Props {
  @PrimaryColumn() @Field() id: string

  @Column() @Field() name: string
  @Column() @Field() web: string
  @Column() @Field() address: string
  @Column() @Field() notes: string
  @Column() @Field() favicon: string // JSON stringified FavicoProps

  @Column() @Field() online: boolean

  @Column() @Field() fid: string
  @Column() @Field() org: string
  @Column() @Field() ofx: string

  @Column() @Field() username: string
  @Column() @Field() password: string

  constructor(props?: BankInput, genId?: () => string) {
    super()
    if (props && genId) {
      this.createRecord(genId, {
        ...Bank.defaultValues,
        ...props
      })
    }
  }
}

export namespace Bank {
  export interface Props extends Pick<BankInput, keyof BankInput> { }
  export interface Interface extends Pick<Bank, Exclude<keyof Bank, ['accounts', 'saveBank', 'deleteBank']>> { }
  export type Query = iupdate.Query<Props>

  export namespace change {
    export const add = (t: number, bank: Bank): DbChange => ({
      table: Bank,
      t,
      adds: [bank]
    })

    export const edit = (t: number, id: string, q: Query): DbChange => ({
      table: Bank,
      t,
      edits: [{ id, q }]
    })

    export const remove = (t: number, id: string): DbChange => ({
      table: Bank,
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
