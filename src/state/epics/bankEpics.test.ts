import configureMockStore, { MockStore } from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { getType } from 'typesafe-actions';
import { actions } from '../../state';
import { EpicDependencies } from './';
import bankEpics from './bankEpics';

describe('bankEpics', () => {
  let store: MockStore<{}>;

  beforeEach(() => {
    let time = 1;
    const dependencies: EpicDependencies = {
      getTime: () => time,
    };

    const rootEpic = combineEpics(...bankEpics);
    const epicMiddleware = createEpicMiddleware(rootEpic, {dependencies});
    const mockStore = configureMockStore([epicMiddleware]);
    store = mockStore();
  });

  it('bankCreateEpic', () => {
    store.dispatch(actions.bankCreate({name: '1st bank'}));
    const actionTypes = store.getActions().map(action => action.type);
    expect(actionTypes).toEqual([
      getType(actions.bankCreate),
      getType(actions.dbChange),
    ]);
  });
});
