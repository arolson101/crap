import { BSON } from 'bson';
import * as update from 'immutability-helper';
import flow from 'lodash-es/flow';
import * as zlib from 'zlib';

type CompressedJson<T> = '<compressed json>' & { _tag: T };

const bson = new BSON();
const CJSONToBuffer = (str: CompressedJson<any>) => new Buffer(str, 'base64');
const bufferToCJSON = (buffer: Buffer) => buffer.toString('base64') as CompressedJson<any>;

export const dehydrate: <T extends Object>(obj: T) => CompressedJson<T> = flow(
  bson.serialize,
  zlib.deflateRawSync,
  bufferToCJSON
);

export const hydrate: <T>(x: CompressedJson<T>) => T = flow(
  CJSONToBuffer,
  zlib.inflateRawSync,
  bson.deserialize,
);

interface Update<T> {
  readonly t: number;
  readonly q: update.Query<T>;
}

export interface Record<T> {
  readonly id: string;
  readonly _deleted: number;
  readonly _base?: CompressedJson<T>;
  readonly _history?: CompressedJson<{ a: Array<Update<T>> }>; // bson doesn't support top-level array
}

export namespace Record {
  export const genSchema = (extra: string) => ['&id, _deleted', extra].join(', ');
}

export const createRecord = <R extends T & Record<T> & T, T>(genId: () => string, props: T): R => {
  const id = genId();
  const _base = undefined;
  const _history = undefined;
  const _deleted = 0;
  // (props as {}) can be removed when https://github.com/Microsoft/TypeScript/pull/13288 is in
  return { ...(props as {}), id, _base, _history, _deleted } as R;
};

const rebuildObject = <T>(props: T, _base: CompressedJson<T> | undefined, changes: Update<T>[]): T => {
  const base: T = _base ? hydrate(_base) : props;
  return changes.reduce((current, change) => update(current, change.q), base);
};

export const updateRecord = <R extends T & Record<T>, T>(record: R, change: Update<T>): R => {
  const { id, _base, _deleted, _history, ...props } = record as Record<T>;
  const prevHistory = _history ? hydrate(_history).a : [];
  const changes = [ ...prevHistory, change ].sort((a, b) => a.t - b.t);
  const isLatest = changes[changes.length - 1] === change;
  const next = isLatest ? update(props, change.q) : rebuildObject(props, _base, changes);
  return {
    ...next,
    id,
    _deleted,
    _base: _base || dehydrate(props as T),
    _history: dehydrate({a: changes}),
  } as R;
};

export const deleteRecord = <R extends Record<T>, T>(record: R, t: number): R => {
  return { ...(record as {}), _deleted: t } as R;
};
