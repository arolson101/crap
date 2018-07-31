import Axios, { CancelTokenSource } from 'axios'
import cuid from 'cuid'
import * as ofx4js from 'ofx4js'
import { checkLogin, createService, getFinancialAccount, toAccountType } from '../../online/index'
import { Account, AccountInput, AccountType, Bank, Transaction, TransactionInput } from '../entities/index'
import { Arg, Ctx, DbChange, dbWrite, FieldResolver, Mutation, Query, Resolver, Root } from './helpers'
import { AppDbService } from '../services/AppDbService'

@Resolver(Account)
export class AccountResolver {
  private tokens = new Map<string, CancelTokenSource>()

  constructor(
    private app: AppDbService
  ) {}

  @Query(returns => Account)
  async account(
    @Arg('accountId') accountId: string,
  ): Promise<Account> {
    return this.app.accounts.get(accountId)
  }

  @Mutation(returns => Account)
  async saveAccount(
    @Arg('input') input: AccountInput,
    @Arg('accountId', { nullable: true }) accountId?: string,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Account> {
    let account: Account
    let changes: Array<any>
    const t = Date.now()
    if (accountId) {
      account = await this.app.accounts.get(accountId)
      const q = Account.diff(account, input)
      changes = [
        Account.change.edit(t, accountId, q)
      ]
      account.update(q)
    } else {
      if (!bankId) {
        throw new Error('when creating an account, bankId must be specified')
      }
      account = new Account(bankId, input, cuid)
      changes = [
        Account.change.add(t, account)
      ]
    }
    await this.app.write(changes)
    return account
  }

  @Mutation(returns => Boolean)
  async deleteAccount(
    @Arg('accountId') accountId: string,
  ): Promise<Boolean> {
    const t = Date.now()
    const changes = [
      Account.change.remove(t, accountId)
    ]
    await this.app.write(changes)
    return true
  }

  @Mutation(returns => Bank)
  async downloadAccountList(
    @Arg('bankId') bankId: string,
    @Arg('cancelToken') cancelToken: string,
  ): Promise<Bank> {

    const bank = await this.app.banks.get(bankId)
    if (!bank.online) {
      throw new Error(`downloadAccountList: bank is not set online`)
    }

    // TODO: make bank query get this for us
    const existingAccounts = await this.app.accounts.getForBank(bank.id)
    const source = Axios.CancelToken.source()
    this.tokens.set(cancelToken, source)

    try {
      const service = createService(bank, source.token)
      const { username, password } = checkLogin(bank)
      const accountProfiles = await service.readAccountProfiles(username, password)
      if (accountProfiles.length === 0) {
        console.log('server reports no accounts')
      } else {
        console.log('accountProfiles', accountProfiles)
        const t = Date.now()
        const accounts = accountProfiles
          .map(accountProfile => toAccountInput(bank, accountProfiles, accountProfile))
          .filter((input): input is Account => input !== undefined)

        const adds = accounts
          .filter(account =>
            !existingAccounts.find(acct =>
              accountsEqual(account, acct)
            )
          )
          .map(input => new Account(bankId, input, cuid))

        const edits = accounts
          .map(account => {
            const existingAccount = existingAccounts.find(acct =>
              accountsEqual(account, acct)
            )
            if (existingAccount) {
              return { id: existingAccount.id, q: Account.diff(existingAccount, account) }
            } else {
              return undefined
            }
          })
          .filter(defined)
          .filter(change => Object.keys(change.q).length > 0)

        if (adds.length || edits.length) {
          const change: DbChange = {
            table: Account,
            t,
            adds,
            edits,
          }
          console.log('account changes', change)
          await this.app.write([change])
        } else {
          console.log('no account changes')
        }
      }
    } catch (ex) {
      if (!source.token.reason) {
        throw ex
      }
    } finally {
      this.tokens.delete(cancelToken)
    }

    return bank
  }

  @FieldResolver(type => [Transaction])
  async transactions(
    @Root() account: Account,
    @Arg('start', { nullable: true }) start?: Date,
    @Arg('end', { nullable: true }) end?: Date,
  ): Promise<Transaction[]> {
    const res = await this.app.transactions.getForAccount(account.id, start, end)
    console.log(`transactions for account ${account.id} (bank ${account.bankId})`, `time: BETWEEN '${start}' AND '${end}'`, res)
    return res
  }

  @Mutation(returns => Account)
  async downloadTransactions(
    @Arg('bankId') bankId: string,
    @Arg('accountId') accountId: string,
    @Arg('start') start: Date,
    @Arg('end') end: Date,
    @Arg('cancelToken') cancelToken: string,
  ): Promise<Account> {

    const bank = await await this.app.banks.get(bankId)
    if (!bank.online) {
      throw new Error(`downloadTransactions: bank is not set online`)
    }

    const account = await this.app.accounts.get(accountId)

    const source = Axios.CancelToken.source()
    this.tokens.set(cancelToken, source)

    try {
      const service = createService(bank, source.token)
      const bankAccount = getFinancialAccount(service, bank, account)
      const bankStatement = await bankAccount.readStatement(start, end)
      const transactionList = bankStatement.getTransactionList()
      const transactions = transactionList.getTransactions()

      if (!transactions) {
        console.log('empty transaction list')
      } else {
        console.log('transactions', transactions)

        const existingTransactions = await this.app.transactions.getForAccount(account.id, start, end)

        const inDateRange = (tx: TransactionInput): boolean => {
          return (tx.time !== undefined && tx.time >= start && tx.time <= end)
        }

        const t = Date.now()

        const txInputs = transactions
          .map(toTransactionInput)
          .filter(inDateRange)

        const adds = txInputs
          .filter(tx => !existingTransactions.find(etx => transactionsEqual(etx, tx)))
          .map(tx => new Transaction(accountId, tx, cuid))

        const edits = txInputs
          .map(tx => {
            const existingTx = existingTransactions.find(etx => transactionsEqual(etx, tx))
            if (existingTx) {
              return { id: existingTx.id, q: Transaction.diff(existingTx, tx) }
            } else {
              return
            }
          })
          .filter(defined)
          .filter(change => Object.keys(change.q).length > 0)

        if (adds.length || edits.length) {
          const change: DbChange = {
            table: Transaction,
            t,
            adds,
            edits,
          }
          console.log('transaction changes', change)
          await this.app.write([change])
        } else {
          console.log('no transaction changes')
        }
      }
    } catch (ex) {
      if (!source.token.reason) {
        throw ex
      }
    } finally {
      this.tokens.delete(cancelToken)
    }

    return account
  }

  @Mutation(returns => Boolean)
  async cancel(
    @Arg('cancelToken') cancelToken: string,
  ): Promise<boolean> {
    const source = this.tokens.get(cancelToken)
    if (!source) {
      return false
    }

    source.cancel('cancelled')
    return true
  }
}

const defined = <T>(object: T | undefined): object is T => !!object

const toAccountInput = (
  bank: Bank,
  accountProfiles: ofx4js.domain.data.signup.AccountProfile[],
  accountProfile: ofx4js.domain.data.signup.AccountProfile
): AccountInput | undefined => {
  const name = accountProfile.getDescription()
    || (accountProfiles.length === 1 ? bank.name : `${bank.name} ${accountProfiles.indexOf(accountProfile)}`)

  if (accountProfile.getBankSpecifics()) {
    const bankSpecifics = accountProfile.getBankSpecifics()
    const bankAccount = bankSpecifics.getBankAccount()
    // bankAccount.getBranchId()
    return {
      name,
      routing: bankAccount.getBankId(),
      type: toAccountType(bankAccount.getAccountType()),
      number: bankAccount.getAccountNumber(),
    }
  } else if (accountProfile.getCreditCardSpecifics()) {
    const creditCardSpecifics = accountProfile.getCreditCardSpecifics()
    const creditCardAccount = creditCardSpecifics.getCreditCardAccount()
    return {
      name,
      type: AccountType.CREDITCARD,
      number: creditCardAccount.getAccountNumber(),
      key: creditCardAccount.getAccountKey() || '',
    }
  } else if (accountProfile.getInvestmentSpecifics()) {
    // TODO: support investment accounts
    console.log('unsupported account: investment')
  } else {
    console.log('unsupported account: ???')
  }
  return undefined
}

const accountsEqual = (a: AccountInput, b: AccountInput): boolean => {
  return (a.type === b.type && a.number === b.number)
}

const timeForTransaction = (tx: ofx4js.domain.data.common.Transaction): Date => tx.getDatePosted()

const toTransactionInput = (tx: ofx4js.domain.data.common.Transaction): TransactionInput => ({
  serverid: tx.getId(),
  time: timeForTransaction(tx),
  type: ofx4js.domain.data.common.TransactionType[tx.getTransactionType()],
  name: tx.getName(),
  memo: tx.getMemo() || '',
  amount: tx.getAmount(),
  // split: {}
})

const transactionsEqual = (a: TransactionInput, b: TransactionInput): boolean => {
  return (a.serverid === b.serverid)
}
