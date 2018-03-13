import * as React from 'react';
import { defineMessages } from 'react-intl';
import { View, Text, Picker } from 'react-native';
import { Bank, selectors, nav, paths } from '../../state';
import { BankForm } from '../forms/BankForm';
import { AccountForm } from '../forms/AccountForm';
import { connect } from '../connect';
import { ctx } from '../ctx';
import { formStyles } from '../forms/fields/formStyles';

interface Params {
  bankId: Bank.Id | typeof paths.accounts.newBankId;
}

interface Props {
  banks: Bank.View[];
}

export const AccountsCreatePageComponent: React.SFC<Props> = (props, {intl, router}: ctx.Intl & ctx.Router<Params>) => {
  const { history, route } = router;
  return (
    <View>
      <Text>create account</Text>

      <Picker
        style={formStyles.picker}
        itemStyle={formStyles.pickerItem}
        onValueChange={(bankId) => router.history.replace(nav.accountCreate(bankId))}
        selectedValue={router.route.match.params.bankId}
      >
        <Picker.Item
          label={intl.formatMessage(messages.new)}
          value={paths.accounts.newBankId}
        />
        {props.banks.map(bankView =>
          <Picker.Item
            key={bankView.bank.id}
            label={bankView.bank.name}
            value={bankView.bank.id}
          />
        )}
      </Picker>

      {router.route.match.params.bankId === paths.accounts.newBankId
        ? <BankForm/>
        : <AccountForm bankId={router.route.match.params.bankId}/>
      }
    </View>
  );
};
AccountsCreatePageComponent.contextTypes = {...ctx.intl, ...ctx.router};

export const AccountsCreatePage = connect(
  state => ({
    banks: selectors.getBanks(state),
  })
)(AccountsCreatePageComponent);

const messages = defineMessages({
  new: {
    id: 'BankForm.new',
    defaultMessage: 'New...'
  },
});
