import { FinancialInstitution } from 'filist';
import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export interface FI extends FinancialInstitution {
  id: number;
}

export interface State {
  list: FI[];
}

export const fiSelectors = {
  getFIs: (state: State) => {
    return state.list;
  },
};

const initialState: State = {
  list: []
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.setFi):
      return { ...state, list: action.fi };

    default:
      return state;
  }
};

export default reducer;
