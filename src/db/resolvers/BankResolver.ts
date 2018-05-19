import { Column, Connection, Entity, PrimaryColumn } from 'typeorm'
import { Arg, Args, ArgsType, Ctx, InputType, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, ResolverContext, ResolverInterface, Root } from './helpers'
import { iupdate } from '../../iupdate'
import { createRecord, Record } from '../Record'
import { DbChange } from '../AppDatabase'
import { getDb, getBank, toBank, getAccount, toAccount } from './DbResolver'
import { Account } from './AccountResolver'

@InputType()
class BankInput {
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

@ArgsType()
class SaveBankArgs {
  @Field() input: BankInput
  @Field({ nullable: true }) bankId?: string
}

@ArgsType()
class DeleteBankArgs {
  @Field() bankId: string
}

@ObjectType()
export class Bank implements Record<Bank> {
  @Column() _deleted: number
  @Column() _base: any
  @Column() _history: any

  @Field() @PrimaryColumn() id: string

  @Field() @Column() name: string
  @Field() @Column() web: string
  @Field() @Column() address: string
  @Field() @Column() notes: string
  @Field() @Column() favicon: string

  @Field() @Column({ default: true }) online: boolean

  @Field() @Column() fid: string
  @Field() @Column() org: string
  @Field() @Column() ofx: string

  @Field() @Column() username: string
  @Field() @Column() password: string
}

@Resolver(Bank)
export class BankResolver {

  @Query(returns => Bank)
  async bank (
    @Arg('bankId') bankId: string,
    @Ctx() context: ResolverContext
  ): Promise<Bank> {
    const db = getDb(context)
    const res = await getBank(db, bankId)
    return toBank(res)
  }

  @Query(returns => [Bank])
  async banks (@Ctx() context: ResolverContext): Promise<Bank[]> {
    const db = getDb(context)
    const res = await db.banks.where({ _deleted: 0 }).toArray()
    return res.map(toBank)
  }

  @FieldResolver(type => [Account])
  async accounts (
    @Root() bank: Bank,
    @Ctx() context: ResolverContext
  ): Promise<Account[]> {
    const db = getDb(context)
    const res = await db.accounts.where({ _deleted: 0, bankId: bank.id }).toArray()
    return res.map(toAccount)
  }

  @Mutation(returns => Bank)
  async saveBank (
    @Args() args: SaveBankArgs,
    @Ctx() context: ResolverContext
  ): Promise<Bank> {
    const db = getDb(context)
    const t = context.getTime()
    let bank: Bank.Interface
    let changes: Array<any>
    if (args.bankId) {
      const edit = await getBank(db, args.bankId)
      const q = Bank.diff(edit, args.input)
      changes = [
        Bank.change.edit(t, args.bankId, q)
      ]
      bank = iupdate(edit, q)
    } else {
      const props: Bank.Props = {
        ...Bank.defaultValues,
        ...args.input as any
      }
      bank = createRecord(context.genId, props)
      changes = [
        Bank.change.add(t, bank)
      ]
    }
    await db.change(changes)
    return toBank(bank)
  }

  @Mutation(returns => Boolean)
  async deleteBank (
    @Args() args: DeleteBankArgs,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
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
  export interface Props extends Pick<BankInput, keyof BankInput> {}
  export interface Interface extends Pick<Bank, Exclude<keyof Bank, ['accounts', 'saveBank', 'deleteBank']>> {}
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