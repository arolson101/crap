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

const defined = (x: string | undefined | null): boolean => (x !== undefined && x !== null);

export const formatAddress = (fi: FI): string => {
  if (fi && fi.profile) {
    return [
      fi.profile.address1,
      fi.profile.address2,
      fi.profile.address3,

      [
        [fi.profile.city, fi.profile.state].filter(defined).join(', '),
        fi.profile.zip
      ].filter(defined).join(' '),

      fi.profile.country
    ].filter(defined).join('\n');
  } else {
    return '';
  }
};
