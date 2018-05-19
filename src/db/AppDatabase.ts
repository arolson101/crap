import Dexie from 'dexie'
import { uniq } from 'lodash'
import { iupdate } from '../iupdate'
import { Record, deleteRecord, updateRecord } from './Record'
import { Account, Bank, Bill, Budget, Category, Transaction } from './resolvers'

export type TableName = typeof Account.table
  | typeof Bank.table
  | typeof Bill.table
  | typeof Budget.table
  | typeof Category.table
  | typeof Transaction.table

export interface Change {
  readonly seq?: number
  readonly text: string
}

export interface DbRecordEdit {
  id: string
  q: iupdate.Query<{}>
}

export interface DbChange {
  table: TableName
  t: number
  adds?: Record<any>[]
  deletes?: string[]
  edits?: Array<DbRecordEdit>
}

export class AppDatabase extends Dexie {
  static readonly schemas = {
    [Account.table]: Account.schema,
    [Bank.table]: Bank.schema,
    [Bill.table]: Bill.schema,
    [Budget.table]: Budget.schema,
    [Category.table]: Category.schema,
    [Transaction.table]: Transaction.schema
  }
  static readonly tables = Object.keys(AppDatabase.schemas) as TableName[]

  _changes: Dexie.Table<Change, string>
  [Account.table]: Dexie.Table<Account, string>
  [Bank.table]: Dexie.Table<Bank, string>
  [Bill.table]: Dexie.Table<Bill, string>
  [Budget.table]: Dexie.Table<Budget, string>
  [Category.table]: Dexie.Table<Category, string>
  [Transaction.table]: Dexie.Table<Transaction, string>

  constructor () {
    super('appdb')
    this.version(1).stores({
      _changes: '++seq',
      ...AppDatabase.schemas
    })
  }

  static async open () {
    const db = new AppDatabase()
    await db.open()
    return db
  }

  async change (changes: DbChange[]) {
    try {
      const tables = uniq(changes.map(change => change.table)).map(this.table)
      const edits = new Map<TableName, Record<any>[]>()
      const deletes = new Map<TableName, string[]>()

      await this.transaction('rw', [...tables, this._changes], async () => {
        for (let change of changes) {
          const table = this.table(change.table)

          if (change.adds) {
            await table.bulkAdd(change.adds)
          }

          if (change.deletes) {
            const items = []
            for (let id of change.deletes) {
              const doc: Record<any> = await table.get(id)
              const nextDoc = deleteRecord(doc, change.t)
              items.push(nextDoc)
            }
            await table.bulkPut(items)

            if (!deletes.has(change.table)) {
              deletes.set(change.table, [])
            }
            deletes.get(change.table)!.push(...change.deletes)
          }

          if (change.edits) {
            const items = []
            for (let edit of change.edits) {
              const doc: Record<any> = await table.get(edit.id)
              const nextDoc = updateRecord(doc, { t: change.t, q: edit.q })
              items.push(nextDoc)
            }
            await table.bulkPut(items)

            if (!edits.has(change.table)) {
              edits.set(change.table, [])
            }
            edits.get(change.table)!.push(...items)
          }
        }

        const text = JSON.stringify(changes)
        await this._changes.add({ text })
      })
    } catch (err) {
      console.error(err)
    }
  }
}
