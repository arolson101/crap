import { Service } from 'typedi'
import { DbChange } from '../entities/helpers'
import { Account, Bank, Transaction } from '../entities/index'
import { dbWrite } from '../resolvers/helpers'
import { AbstractRepository, Connection, EntityRepository } from '../typeorm'

@Service()
export class AppDbService {
  private appDbConnection: Connection
  banks: BankRepository
  accounts: AccountRepository
  transactions: TransactionRepository

  open(appDbConnection: Connection) {
    this.appDbConnection = appDbConnection
    this.banks = appDbConnection.getCustomRepository(BankRepository)
    this.accounts = appDbConnection.getCustomRepository(AccountRepository)
    this.transactions = appDbConnection.getCustomRepository(TransactionRepository)
  }

  async close() {
    await this.appDbConnection.close()
    delete this.appDbConnection
    delete this.banks
    delete this.accounts
    delete this.transactions
  }

  async write(changes: DbChange[]) {
    await dbWrite(this.appDbConnection, changes)
  }
}

abstract class RecordRepository<T> extends AbstractRepository<T> {
  async get(id: string) {
    const res = await this.createQueryBuilder('e')
      .where({ _deleted: 0, id })
      .getOne()
    if (!res) {
      throw new Error('entity not found')
    }
    return res
  }

  async all() {
    return this.createQueryBuilder('e')
      .where({ _deleted: 0 })
      .getMany()
  }
}

@EntityRepository(Bank)
class BankRepository extends RecordRepository<Bank> {
}

@EntityRepository(Account)
class AccountRepository extends RecordRepository<Account> {
  async getForBank(bankId: string) {
    return this.createQueryBuilder('account')
      .where({ _deleted: 0, bankId })
      .getMany()
  }
}

@EntityRepository(Transaction)
class TransactionRepository extends RecordRepository<Transaction> {
  async getForAccount(accountId: string, start?: Date, end?: Date) {
    let q = this.createQueryBuilder('tx')
      .where({ _deleted: 0, accountId })

    if (start && end) {
      q = q.andWhere('tx.time BETWEEN :start AND :end', { start, end })
    }

    const res = await q
      .orderBy({ time: 'ASC' })
      .getMany()
    return res
  }
}
