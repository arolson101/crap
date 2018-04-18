import Dexie from 'dexie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getType } from 'typesafe-actions';
import { iupdate } from '../../iupdate';
import { actions, AppDatabase } from '../';
import { ThunkDependencies } from './';

describe('dbThunks', () => {
  let time = 1;
  let id = 1;
  const dependencies: ThunkDependencies = {
    getTime: () => time++,
    genId: () => `id${id++}`,
    openDb: AppDatabase.open,
  };
  const mockStore = configureMockStore([thunk.withExtraArgument(dependencies)]);

  beforeEach(() => {
    time = 1;
    id = 1;
  });

  test('dbInit', async () => {
    let mockDbs: string[] = ['db1', 'db2'];
    Dexie.getDatabaseNames = jest.fn(() => Promise.resolve(mockDbs));
    const store = mockStore();
    await store.dispatch(actions.dbInit());
    const acts = store.getActions();
    expect(acts).toEqual([
      actions.dbSetAvailableDbs(mockDbs)
    ]);
  });

  test('dbOpen', async () => {
    const store = mockStore();
    await store.dispatch(actions.dbOpen('foo', 'password'));
    const acts = store.getActions();
    expect(acts).toHaveLength(AppDatabase.tables.length + 1);
    let i = 0;
    expect(acts[i++]).toHaveProperty('type', getType(actions.dbOpenSuccess));
  });

  test('$exclude works on arrays', () => {
    const test = ['a', 'b', 'c', 'c'];
    expect(iupdate(test, {$exclude: ['b']})).toEqual(['a', 'c', 'c']);
    expect(iupdate(test, {$exclude: ['a']})).toEqual(['b', 'c', 'c']);
    expect(iupdate(test, {$exclude: ['c']})).toEqual(['a', 'b']);
    expect(iupdate(test, {$exclude: ['d']})).toEqual(test);
  });
});
