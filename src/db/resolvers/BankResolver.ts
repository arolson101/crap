import { Entity, Column, Index, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { Record, RecordClass, createRecord } from '../Record'
import { Account } from './AccountResolver'
import { Arg, Ctx, DbChange, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, Root, dbWrite } from './helpers'
import { selectors } from '../../redux/reducers/index';

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
@Entity({ name: 'banks' })
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
    @Ctx() { appDb }: ResolverContext,
    @Arg('bankId') bankId: string,
  ): Promise<Bank> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.manager.createQueryBuilder(Bank, 'bank')
      .where('bank._deleted = 0 AND bank.id = :bankId', { bankId })
      .getOne()
    if (!res) {
      throw new Error('account not found')
    }
    return res
  }

  @Query(returns => [Bank])
  async banks (@Ctx() { appDb }: ResolverContext): Promise<Bank[]> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.createQueryBuilder(Bank, 'bank')
      .where('bank._deleted = 0')
      .getMany()
    return res
  }

  @FieldResolver(type => [Account])
  async accounts (
    @Ctx() { appDb }: ResolverContext,
    @Root() bank: Bank,
  ): Promise<Account[]> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.createQueryBuilder(Account, 'account')
      .where('account._deleted = 0 AND account.bankId=:bankId', { bankId: bank.id })
      .getMany()
    return res
  }

  @Mutation(returns => Bank)
  async saveBank (
    @Ctx() { appDb, getTime, genId }: ResolverContext,
    @Arg('input') input: BankInput,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Bank> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = getTime()
    let bank: Bank
    let changes: Array<any>
    if (bankId) {
      bank = await appDb.manager.findOneOrFail(Bank, bankId)
      const q = Bank.diff(bank, input)
      changes = [
        Bank.change.edit(t, bankId, q)
      ]
      bank.update(q)
    } else {
      bank = new Bank(input, genId)
      changes = [
        Bank.change.add(t, bank)
      ]
    }
    await dbWrite(appDb, changes)
    return bank
  }

  @Mutation(returns => Boolean)
  async deleteBank (
    @Ctx() { appDb, getTime }: ResolverContext,
    @Arg('bankId') bankId: string,
  ): Promise<Boolean> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = getTime()
    const changes = [
      Bank.change.remove(t, bankId)
    ]
    await dbWrite(appDb, changes)
    return true
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
