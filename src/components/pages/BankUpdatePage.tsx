import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState, Bank, selectors } from '../../state';
import { BankForm } from '../forms/BankForm';

interface Params {
  bankId: Bank.Id;
}

interface Props {
  bankId: Bank.Id;
}

interface ConnectedProps extends Props {
  bank: Bank;
}

export const BankUpdatePageComponent: React.SFC<ConnectedProps> = ({bank, children}) => (
  <BankForm edit={bank}>
    {children}
  </BankForm>
);

export const BankUpdatePage = connect(
  (state: RootState, props: RouteComponentProps<Params>) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
    });
  }
)(BankUpdatePageComponent);
BankUpdatePage.displayName = 'BankUpdatePage';
