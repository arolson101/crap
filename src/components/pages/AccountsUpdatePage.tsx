import * as React from 'react';
import { defineMessages } from 'react-intl';
import { View, Text, Picker } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { Bank, Account, selectors, nav, paths } from '../../state';
import { BankForm } from '../forms/BankForm';
import { AccountForm } from '../forms/AccountForm';
import { connect } from '../connect';
import { ctx } from '../ctx';
import { formStyles } from '../forms/fields/formStyles';

interface Params {
  bankId: Bank.Id;
  accountId?: Account.Id;
}

export const AccountsUpdatePage: React.SFC =
  (props, { intl, router }: ctx.Intl & ctx.Router<Params>) => {
    const { history, route } = router;
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

const messages = defineMessages({
  new: {
    id: 'BankForm.new',
    defaultMessage: 'New...'
  },
});
