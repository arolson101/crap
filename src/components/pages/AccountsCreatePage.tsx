import * as React from 'react';
import { defineMessages } from 'react-intl';
import { View, Text, Picker } from 'react-native';
// import { connect } from 'react-redux';
import { Bank, selectors } from '../../state';
import { BankForm } from '../forms/BankForm';
import { AccountForm } from '../forms/AccountForm';
import { ctx } from '../ctx';
import { formStyles } from '../forms/fields/formStyles';
import { connect } from '../connect';

interface Props {
  banks: Bank.View[];
}

interface State {
  bankId: string | typeof newBank;
}

const newBank = 'new';

@connect(
  state => ({
    banks: selectors.getBanks(state),
  })
)
export class AccountsCreatePage extends React.Component<Props, State> {
  static contextTypes = ctx.intl;

  state: State = {
    bankId: newBank
  };

  render() {
    const { intl: { formatMessage } } = this.context as ctx.Intl;
    return (
      <View>
        <Text>create account</Text>

        <Picker
          style={formStyles.picker}
          itemStyle={formStyles.pickerItem}
          onValueChange={(bankId) => this.setState({bankId})}
          selectedValue={this.state.bankId}
        >
          <Picker.Item
            label={formatMessage(messages.new)}
            value={newBank}
          />
          {this.props.banks.map(bankView =>
            <Picker.Item
              key={bankView.bank.id}
              label={bankView.bank.name}
              value={bankView.bank.id}
            />
          )}
        </Picker>

        {this.state.bankId === newBank
          ? <BankForm/>
          : <AccountForm bankId={this.state.bankId as Bank.Id}/>
        }
      </View>
    );
  }
}

const messages = defineMessages({
  new: {
    id: 'BankForm.new',
    defaultMessage: 'New...'
  },
});
