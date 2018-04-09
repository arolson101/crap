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

interface Props extends RouteComponentProps<Params> {
  bank: Bank;
  account?: Account;
}

export const AccountsUpdatePageComponent: React.SFC<Props> =
  (props, { intl, router }: ctx.Intl & ctx.Router<Params>) => {
    const { history, route } = router;
    return (
      <View>
        <Text>update account</Text>
        {props.account
          ? <AccountForm bankId={props.bank.id} edit={props.account} />
          : <BankForm edit={props.bank} />
        }
      </View>
    );
  };
AccountsUpdatePageComponent.contextTypes = { ...ctx.intl, ...ctx.router };

export const AccountsUpdatePage = connect(
  (state, { match: { params } }: Props) => ({
    bank: selectors.getBank(state, params.bankId),
    account: params.accountId && selectors.getAccount(state, params.accountId),
  })
)(AccountsUpdatePageComponent);

const messages = defineMessages({
  new: {
    id: 'BankForm.new',
    defaultMessage: 'New...'
  },
});
