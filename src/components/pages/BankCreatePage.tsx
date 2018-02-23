import * as React from 'react';
import { BankForm } from '../forms/BankForm';

export const BankCreatePage: React.SFC = ({children}) => (
  <BankForm>
    {children}
  </BankForm>
);
