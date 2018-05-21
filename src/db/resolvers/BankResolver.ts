import { Entity, Column, Index, PrimaryColumn } from 'typeorm/browser'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { Record, RecordClass, createRecord } from '../Record'
import { Account } from './AccountResolver'
import { getBank, getDb } from './DbResolver'
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, Root, dbWrite } from './helpers'

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

@ObjectType()
@Entity({ name: 'accounts' })
export class Bank extends RecordClass<Bank> implements Bank.Props {
  @PrimaryColumn() @Field() id: string

  @Column() @Field() name: string
  @Column() @Field() web: string
  @Column() @Field() address: string
  @Column() @Field() notes: string
  @Column() @Field() favicon: string

  @Column() @Field() online: boolean

  @Column() @Field() fid: string
  @Column() @Field() org: string
  @Column() @Field() ofx: string

  @Column() @Field() username: string
  @Column() @Field() password: string

  constructor (props?: BankInput, genId?: () => string) {
    super()
    if (props && genId) {
      this.createRecord(genId, {
        ...Bank.defaultValues,
        ...props
      })
    }
  }
}

@Resolver(Bank)
export class BankResolver {

  @Query(returns => Bank)
  async bank (
    @Arg('bankId') bankId: string,
    @Ctx() context: ResolverContext
  ): Promise<Bank> {
    const db = getDb(context)
    const res = getBank(db, bankId)
    return res
  }

  @Query(returns => [Bank])
  async banks (@Ctx() context: ResolverContext): Promise<Bank[]> {
    const db = getDb(context)
    const res = await db.createQueryBuilder()
      .select()
      .from(Bank, 'bank')
      .where('bank._deleted = 0')
      .getMany()
    return res
  }

  @FieldResolver(type => [Account])
  async accounts (
    @Root() bank: Bank,
    @Ctx() context: ResolverContext
  ): Promise<Account[]> {
    const db = getDb(context)
    const res = await db.createQueryBuilder()
      .select()
      .from(Account, 'account')
      .where('user._deleted = 0 AND user.bankId=:bankId', { bankId: bank.id })
      .getMany()
    return res
  }

  @Mutation(returns => Bank)
  async saveBank (
    @Ctx() context: ResolverContext,
    @Arg('input') input: BankInput,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Bank> {
    const db = getDb(context)
    const t = context.getTime()
    let bank: Bank
    let changes: Array<any>
    if (bankId) {
      bank = await getBank(db, bankId)
      const q = Bank.diff(bank, input)
      changes = [
        Bank.change.edit(t, bankId, q)
      ]
      bank.update(q)
    } else {
      bank = new Bank(input, context.genId)
      changes = [
        Bank.change.add(t, bank)
      ]
    }
    await dbWrite(changes)
    return bank
  }

  @Mutation(returns => Boolean)
  async deleteBank (
    @Arg('bankId') bankId: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = getDb(context)
    const t = context.getTime()
    const changes = [
      Bank.change.remove(t, bankId)
    ]
    await dbWrite(changes)
    return true
  }
}

export namespace Bank {
  export interface Props extends Pick<BankInput, keyof BankInput> { }
  export interface Interface extends Pick<Bank, Exclude<keyof Bank, ['accounts', 'saveBank', 'deleteBank']>> { }
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
