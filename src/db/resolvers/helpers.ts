import { SchemaGenerator } from 'type-graphql/schema/schema-generator'
import { BuildSchemaOptions } from 'type-graphql/utils/buildSchema'
import { iupdate } from '../../iupdate'
import { Record, RecordClass } from '../Record'
import { Connection } from '../typeorm'
export { Arg, Args, ArgsType, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, registerEnumType, Resolver, Root } from 'type-graphql/decorators'
export { ResolverInterface } from 'type-graphql/interfaces'
export { ResolverContext } from '../AppDbProvider'

// build this function manually (copied from type-graphql) to fix runtime error:
//   ./node_modules/type-graphql/helpers/loadResolversFromGlob.js
//   10:46-63 Critical dependency: the request of a dependency is an expression
export function buildSchemaSync(options: BuildSchemaOptions) {
  return SchemaGenerator.generateFromMetadataSync(options)
}

export interface Change {
  readonly seq?: number
  readonly text: string
}

export interface DbRecordEdit {
  id: string
  q: iupdate.Query<{}>
}

type Table = any

export interface DbChange {
  table: Table
  t: number
  adds?: Record<any>[]
  deletes?: string[]
  edits?: Array<DbRecordEdit>
}

export const dbWrite = async (db: Connection, changes: DbChange[]) => {
  try {
    await db.transaction(async (manager) => {
      for (let change of changes) {
        if (change.adds) {
          await manager.save(change.table, change.adds)
        }

        if (change.deletes) {
          await manager.createQueryBuilder()
            .update(change.table)
            .set({ _deleted: change.t })
            .whereInIds(change.deletes)
            .execute()
        }

        if (change.edits) {
          const edits = change.edits
          const items: RecordClass<any>[] = await manager.findByIds(change.table, change.edits.map(edit => edit.id)) as any[]
          items.forEach((record, i) => {
            record.update(edits[i].q)
          })
          await manager.save(change.table, items)
        }
      }

      // const text = JSON.stringify(changes)
      // await this._changes.add({ text })
    })
  } catch (err) {
    console.error(err)
  }
}
