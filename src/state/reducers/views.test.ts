import { createStore } from 'redux';
import { actions } from '../actions';
import reducer, { Bank, viewsSelectors as selectors } from './views';

describe('views', () => {
  test('recordsUpdated', () => {
    const store = createStore(reducer);
    const bankRecords: Bank[] = [
      {id: 'id1' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '1st bank', accounts: []},
      {id: 'id2' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank', accounts: []},
    ];
    store.dispatch(actions.recordsUpdated('banks', bankRecords));
    const views = store.getState();
    expect(views).toEqual({
      banks: {
        [bankRecords[0].id]: bankRecords[0],
        [bankRecords[1].id]: bankRecords[1],
      }
    });
  });

  test('recordsDeleted', () => {
    const bankRecords: Bank[] = [
      {id: 'id1' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '1st bank', accounts: []},
      {id: 'id2' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank', accounts: []},
    ];
    const store = createStore(reducer, {
      banks: {
        [bankRecords[0].id]: bankRecords[0],
        [bankRecords[1].id]: bankRecords[1],
      }
    });
    store.dispatch(actions.recordsDeleted('banks', [bankRecords[0].id]));
    const views = store.getState();
    expect(views).toEqual({
      banks: {
        [bankRecords[1].id]: bankRecords[1],
      }
    });
  });

  test('viewsSelectors', () => {
    const bankRecords: Bank[] = [
      {id: 'id1' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '1st bank', accounts: []},
      {id: 'id2' as Bank.Id, _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank', accounts: []},
    ];
    const store = createStore(reducer, {
      banks: {
        [bankRecords[0].id]: bankRecords[0],
        [bankRecords[1].id]: bankRecords[1],
      }
    });
    const bank = selectors.getBank(store.getState()!, bankRecords[1].id);
    expect(bank).toBe(bankRecords[1]);
  });
});
