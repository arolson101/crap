import * as React from 'react';
import { View, Text } from 'react-native';
import { Bank, Account } from '../../db';
import { BankForm } from '../forms/BankForm';
import { AccountForm } from '../forms/AccountForm';
import { ctx } from '../ctx';

interface Params {
  bankId: Bank.Id;
  accountId?: Account.Id;
}

export const AccountsUpdatePage: React.SFC =
  (props, { intl, router }: ctx.Intl & ctx.Router<Params>) => {
    const { route } = router;
    const { bankId, accountId } = route.match.params;
    return (
      <View>
        <Text>update account</Text>
        {accountId
          ? <AccountForm bankId={bankId} accountId={accountId} />
          : <BankForm bankId={bankId} />
        }
      </View>
    );
  };
AccountsUpdatePage.contextTypes = { ...ctx.intl, ...ctx.router };
