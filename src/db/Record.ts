import { Entity, Column, Index, PrimaryColumn } from 'typeorm/browser'
import { BSON } from 'bson'
import { iupdate } from '../iupdate'
import { flow } from 'lodash'
import * as zlib from 'zlib'

export type CompressedJson<T> = '<compressed json>' & { _tag: T }

const bson = new BSON()
const CJSONToBuffer = (str: CompressedJson<any>) => new Buffer(str, 'base64')
const bufferToCJSON = (buffer: Buffer) => buffer.toString('base64') as CompressedJson<any>

export const dehydrate: <T extends Object>(obj: T) => CompressedJson<T> = flow(
  bson.serialize,
  zlib.deflateRawSync,
  bufferToCJSON
)

export const hydrate: <T>(x: CompressedJson<T>) => T = flow(
  CJSONToBuffer,
  zlib.inflateRawSync,
  bson.deserialize
)

interface Update<T> {
  readonly t: number
  readonly q: iupdate.Query<T>
}

export type BaseType<T> = CompressedJson<T>
export type HistoryType<T> = CompressedJson<{ a: Array<Update<T>> }> // bson doesn't support top-level array

export interface Record<T = {}, ID = string> {
  readonly id: ID
  readonly _deleted: number
  readonly _base?: BaseType<T>
  readonly _history?: HistoryType<T>
}

@Entity()
// @Index(['_deleted', 'id'])
export abstract class RecordClass<T> implements Record<T> {
  @Column() _deleted: number
  @Column('text') _base?: BaseType<T>
  @Column('text') _history?: HistoryType<T>
  @PrimaryColumn() id: string

  update (input: Partial<T>) {
    const new = iupdate(this, q)
  }
}

export namespace Record {
  export const genSchema = (...extra: string[]) => ['&id, _deleted', '[id+_deleted]', ...extra].join(', ')
}

export const createRecord = <R extends T & Record<T> & T, T>(genId: () => string, props: T): R => {
  const id = genId()
  const _base = undefined
  const _history = undefined
  const _deleted = 0
  // (props as {}) can be removed when https://github.com/Microsoft/TypeScript/pull/13288 is in
  return { ...(props as {}), id, _base, _history, _deleted } as R
}

const rebuildObject = <T>(props: T, _base: CompressedJson<T> | undefined, changes: Update<T>[]): T => {
  const base: T = _base ? hydrate(_base) : props
  return changes.reduce((current, change) => iupdate(current, change.q), base)
}

export const updateRecord = <R extends T & Record<T>, T>(record: R, change: Update<T>): R => {
  const { id, _base, _deleted, _history, ...props } = record as Record<T>
  const prevHistory = _history ? hydrate(_history).a : []
  const changes = [ ...prevHistory, change ].sort((a, b) => a.t - b.t)
  const isLatest = changes[changes.length - 1] === change
  const next = isLatest ? iupdate(props, change.q) : rebuildObject(props, _base, changes)
  return {
    ...next,
    id,
    _deleted,
    _base: _base || dehydrate(props as T),
    _history: dehydrate({ a: changes })
  } as R
}

export const deleteRecord = <R extends Record<T>, T>(record: R, t: number): R => {
  return { ...(record as {}), _deleted: t } as R
}
