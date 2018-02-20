import { FinancialInstitution, FinancialInstitutionProfile } from 'filist';
import { actions } from '../actions';
import { RootThunk } from './';
import { FI } from '../reducers/fi';

const emptyprofile: FinancialInstitutionProfile = {
  address1: '',
  address2: '',
  address3: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  email: '',
  customerServicePhone: '',
  technicalSupportPhone: '',
  fax: '',
  financialInstitutionName: '',
  siteURL: ''
};

const emptyfi: FinancialInstitution = {
  name: '',
  fid: '',
  org: '',
  ofx: '',
  profile: emptyprofile
};

export const finalizeFilist = (filist: FinancialInstitution[]): FI[] => [
  {...emptyfi, id: 0},
  ...filist.map((fi, index) => ({ ...fi, id: index + 1 }))
];

export default {
  fiInit: (): RootThunk => async function fiInitThunk(dispatch) {
    // TODO: don't webpack this
    const filist: FinancialInstitution[] = require<FinancialInstitution[]>('filist/filist.json');
    const fis = finalizeFilist(filist);
    dispatch(actions.setFi(fis));
  },
};
