import { createStore } from 'redux';
import reducer, { viewsActions as actions, Bank, viewsSelectors as selectors } from './views';

describe('views', () => {
  test('recordsUpdated', () => {
    const store = createStore(reducer);
    const bankRecords: Bank[] = [
      {id: 'id1', _base: undefined, _history: undefined, _deleted: 0, name: '1st bank'},
      {id: 'id2', _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank'},
    ];
    store.dispatch(actions.viewsRecordsUpdated('banks', bankRecords));
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
      {id: 'id1', _base: undefined, _history: undefined, _deleted: 0, name: '1st bank'},
      {id: 'id2', _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank'},
    ];
    const store = createStore(reducer, {
      banks: {
        [bankRecords[0].id]: bankRecords[0],
        [bankRecords[1].id]: bankRecords[1],
      }
    });
    store.dispatch(actions.viewsRecordsDeleted('banks', [bankRecords[0].id]));
    const views = store.getState();
    expect(views).toEqual({
      banks: {
        [bankRecords[1].id]: bankRecords[1],
      }
    });
  });

  test('viewsSelectors', () => {
    const bankRecords: Bank[] = [
      {id: 'id1', _base: undefined, _history: undefined, _deleted: 0, name: '1st bank'},
      {id: 'id2', _base: undefined, _history: undefined, _deleted: 0, name: '2nd bank'},
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
