import { BSON } from 'bson';
import * as update from 'immutability-helper';
import * as R from 'ramda';
import * as shortid from 'shortid';
import * as zlib from 'zlib';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

type CompressedJson<T> = '<compressed json>' & { _tag: T };

const bson = new BSON();
const CJSONToBuffer = (str: CompressedJson<any>) => new Buffer(str, 'base64');
const bufferToCJSON = (buffer: Buffer) => buffer.toString('base64') as CompressedJson<any>;

const dehydrate: <T extends Object>(obj: T) => CompressedJson<T> = R.pipe(
  bson.serialize,
  zlib.deflateSync,
  bufferToCJSON
);

const hydrate: <T>(x: CompressedJson<T>) => T = R.pipe(
  CJSONToBuffer,
  zlib.inflateSync,
  bson.deserialize,
);

interface Update<T> {
  readonly t: number;
  readonly q: update.Query<T>;
}

export interface Node<T> {
  readonly id: string;
  readonly _deleted?: boolean;
  readonly _base?: CompressedJson<T>;
  readonly _history?: CompressedJson<{ a: Array<Update<T>> }>; // bson doesn't support top-level array
}

export const createNode = <N extends Node<T> & T, T>(props: T): N => {
  const id = shortid();
  const _base = undefined;
  const _history = undefined;
  // (props as {}) can be removed when https://github.com/Microsoft/TypeScript/pull/13288 is in
  return { ...(props as {}), id, _base, _history } as N;
};

const rebuildObject = <T>(props: T, _base: CompressedJson<T> | undefined, changes: Update<T>[]): T => {
  const base: T = _base ? hydrate(_base) : props;
  return changes.reduce((current, change) => update(current, change.q), base);
};

export const updateNode = <N extends Node<T>, T>(node: N, change: Update<T>): N => {
  const { id, _base, _deleted, _history, ...props } = node as Node<T>;
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
  } as N;
};

export const deleteNode = <N extends Node<T>, T>(node: N, t: number): N => {
  return { ...(node as {}), _deleted: true } as N;
};
