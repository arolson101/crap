import { Column, Connection, Entity, PrimaryColumn } from 'typeorm'
import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { DbChange } from '../AppDatabase'
import { Boolean, Field, Input, Mutation, None, Nullable, ResolverContext, String, Type } from './helpers'
import { getDb, getBank, toBank, getAccount, toAccount } from './DbType'
import { Account } from './AccountType'

@Input export class BankInput {
  @Nullable @Field name?: string
  @Nullable @Field web?: string
  @Nullable @Field address?: string
  @Nullable @Field notes?: string
  @Nullable @Field favicon?: string

  @Nullable @Field online?: boolean

  @Nullable @Field fid?: string
  @Nullable @Field org?: string
  @Nullable @Field ofx?: string

  @Nullable @Field username?: string
  @Nullable @Field password?: string
}

class SaveBankArgs {
  @Field input: BankInput
  @Nullable @Field bankId?: string
}

class DeleteBankArgs {
  @Field bankId: string
}

@Type export class Bank implements Record<Bank> {
  @Column() _deleted: number
  @Column() _base: any
  @Column() _history: any

  @Field @PrimaryColumn() id: string

  @Field @Column({ default: '' }) name: string
  @Field @Column({ default: '' }) web: string
  @Field @Column({ default: '' }) address: string
  @Field @Column({ default: '' }) notes: string
  @Field @Column({ default: '' }) favicon: string

  @Field @Column({ default: true }) online: boolean

  @Field @Column({ default: '' }) fid: string
  @Field @Column({ default: '' }) org: string
  @Field @Column({ default: '' }) ofx: string

  @Field @Column({ default: '' }) username: string
  @Field @Column({ default: '' }) password: string

  @Field([Account]) async accounts (bank: Bank, args: None, context: ResolverContext) {
    const db = getDb(context)
    const res = await db.accounts.where({ _deleted: 0, bankId: bank.id }).toArray()
    return res.map(toAccount)
  }

  @Mutation(Bank) async saveBank (source: Bank, args: SaveBankArgs, context: ResolverContext) {
    const db = getDb(context)
    const t = context.getTime()
    let bank: Bank = source
    let changes: Array<any> = []
    // if (args.bankId) {
    //   const edit = await getBank(db, args.bankId)
    //   const q = Bank.diff(edit, args.input)
    //   changes = [
    //     Bank.change.edit(t, args.bankId, q)
    //   ]
    //   bank = iupdate(edit, q)
    // } else {
    //   const props: Bank.Props = {
    //     ...Bank.defaultValues,
    //     ...args.input as any
    //   }
    //   bank = createRecord(context.genId, props)
    //   changes = [
    //     Bank.change.add(t, bank)
    //   ]
    // }
    await db.change(changes)
    return toBank(bank)
  }

  @Mutation(Boolean) async deleteBank (source: any, args: DeleteBankArgs, context: ResolverContext) {
    const db = getDb(context)
    const t = context.getTime()
    const changes = [
      Bank.change.remove(t, args.bankId)
    ]
    await db.change(changes)
    return true
  }

}

export namespace Bank {

  export type Props = { [k in keyof Bank]: Bank[k] }
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

  // export const defaultValues: Props = {
  //   name: '',
  //   web: '',
  //   address: '',
  //   notes: '',
  //   favicon: '',

  //   online: true,

  //   fid: '',
  //   org: '',
  //   ofx: '',

  //   username: '',
  //   password: ''
  // }

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
