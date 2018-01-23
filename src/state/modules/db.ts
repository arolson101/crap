import { BSON } from 'bson';
import Dexie from 'dexie';
import * as iupdate from 'immutability-helper';
import * as R from 'ramda';
import * as shortid from 'shortid';
import { createAction, getType } from 'typesafe-actions';
import * as zlib from 'zlib';
import { RootAction } from '../index';

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
  readonly q: Query<T>;
}

interface Node<T> {
  readonly id: string;
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
  return changes.reduce((current, change) => iupdate(current, change.q), base);
};

export const updateNode = <N extends Node<T>, T>(node: N, change: Update<T>): N => {
  const { id, _base, _history, ...props } = node as Node<T>;
  const prevHistory = _history ? hydrate(_history).a : [];
  const changes = [ ...prevHistory, change ].sort((a, b) => a.t - b.t);
  const isLatest = changes[changes.length - 1] === change;
  const next = isLatest ? iupdate(props, change.q) : rebuildObject(props, _base, changes);
  return {
    ...next,
    id,
    _base: _base || dehydrate(props as T),
    _history: dehydrate({a: changes}),
  } as N;
};

export interface Bank extends Bank.Props, Node<Bank.Props> {}

export namespace Bank {
  export interface Props {
    name: string;
  }
  export type Q = Query<Props>;
  export const schema = { banks: '&id, name' };

  export const create = (db: AppDatabase, props: Props) => {
    return db.transaction('rw', db.banks, async () => {
      const bank = createNode(props);
      await db.banks.add(bank);
      return bank;
    });
  };

  export const update = (db: AppDatabase, id: string, t: number, q: Bank.Q) => {
    return db.transaction('rw', db.banks, async () => {
      const bank = await db.banks.get(id);
      if (!bank) {
        throw new Error(`bank ${id} not in db!`);
      }
      const nextBank: Bank = updateNode(bank, {t, q});
      await db.banks.put(nextBank);
      return nextBank;
    });
  };
}

export const actions = {
  dbInit: createAction('db/INIT'),
  setDbs: createAction('db/SET_DBS', (dbs: string[]) => ({
    type: 'db/SET_DBS', dbs
  })),

  dbOpen: createAction('db/DB_OPEN', (name: string) => ({
    type: 'db/DB_OPEN', name
  })),
  dbOpenSuccess: createAction('db/DB_OPEN_SUCCESS', (db: AppDatabase) => ({
    type: 'db/DB_OPEN_SUCCESS', db
  })),
  dbOpenFailure: createAction('db/DB_OPEN_FAILURE', (err: Error) => ({
    type: 'db/DB_OPEN_FAILURE', err
  })),
};

export class AppDatabase extends Dexie {
  banks: Dexie.Table<Bank, string>;

  constructor (name: string) {
    super(name);
    this.version(1).stores({
      ...Bank.schema,
    });
  }
}

export interface State {
  db?: AppDatabase;
  dbs: string[];
  isOpening: boolean;
  openError?: Error;
}

const initialState: State = {
  db: undefined,
  dbs: [],
  isOpening: false,
  openError: undefined,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.setDbs):
      return { ...state, dbs: action.dbs };

    case getType(actions.dbOpen):
      return { ...state, db: undefined, openError: undefined };

    case getType(actions.dbOpenSuccess):
      return { ...state, db: action.db };

    case getType(actions.dbOpenFailure):
      return { ...state, openError: action.err };

    default:
      return state;
  }
};

export default reducer;
