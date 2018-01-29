import Dexie from 'dexie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getType } from 'typesafe-actions';
import { actions, ThunkDependencies } from '../';

describe('dbThunks', () => {
  let time = 1;
  let id = 1;
  const dependencies: ThunkDependencies = {
    getTime: () => time++,
    genId: () => `id${id++}`,
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
    expect(acts).toEqual([actions.dbSetAvailableDbs(mockDbs)]);
  });

  test('dbOpen', async () => {
    const store = mockStore();
    await store.dispatch(actions.dbOpen('foo'));
    const acts = store.getActions();
    expect(acts).toHaveLength(1);
    expect(acts[0]).toHaveProperty('type', getType(actions.dbOpenSuccess));
  });

});
