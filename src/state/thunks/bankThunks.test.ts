import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actions, ThunkDependencies, AppDatabase } from '../';

describe('bankThunks', () => {
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

  test('bankCreate', async () => {
    const db = new AppDatabase('test');
    const store = mockStore({db: { db }});

    const allBanks = () => db.banks.where({_deleted: 0}).toArray();

    let banks = await allBanks();
    expect(banks).toHaveLength(0);

    // create
    await store.dispatch(actions.bankCreate({name: '1st bank'}));
    await store.dispatch(actions.bankCreate({name: '2nd bank'}));

    banks = await allBanks();
    expect(banks).toHaveLength(2);
    expect(banks[0]).toHaveProperty('name', '1st bank');
    expect(banks[1]).toHaveProperty('name', '2nd bank');

    // update
    time = 200;
    await store.dispatch(actions.bankUpdate(banks[0].id, {name: {$set: '1st bank (modified)'}}));
    banks = await allBanks();
    expect(banks).toHaveLength(2);
    expect(banks[0]).toHaveProperty('name', '1st bank (modified)');
    expect(banks[0]._base).toBeDefined();
    expect(banks[0]._history).toBeDefined();
    const base = banks[0]._base;
    const history = banks[0]._history;

    // out-of-sequence update
    time = 100;
    await store.dispatch(actions.bankUpdate(banks[0].id, {name: {$set: 'discard this change'}}));
    banks = await allBanks();
    expect(banks).toHaveLength(2);
    expect(banks[0]).toHaveProperty('name', '1st bank (modified)');
    expect(banks[0]).toHaveProperty('_base', base);
    expect(banks[0]._history).not.toBe(history);

    // delete
    time = 300;
    await store.dispatch(actions.bankDelete(banks[0].id));
    banks = await allBanks();
    expect(banks).toHaveLength(1);
    expect(banks[0]).toHaveProperty('name', '2nd bank');
  });
});
