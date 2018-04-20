import * as React from 'react';
import { Bank } from '../../db';
import { BankForm } from '../forms/BankForm';
import { ctx } from '../ctx';

interface Params {
  bankId: Bank.Id;
}

interface Props {
  bankId: Bank.Id;
}

interface ConnectedProps extends Props {
  bank: Bank;
}

export const BankUpdatePage: React.SFC<ConnectedProps> = ({ bank, children }, context: ctx.Router<Params>) => {
  const { bankId } = context.router.route.match.params;
  return (
    <BankForm bankId={bankId}>
      {children}
    </BankForm>
  );
};
BankUpdatePage.contextTypes = ctx.router;
