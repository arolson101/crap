import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, selectors, Bank } from '../../state';
import { BankForm } from '../forms/BankForm';
import { AccountForm } from '../forms/AccountForm';
import { ctx } from '../ctx';

interface Params {
  bankId: string;
}

interface Props {
  banks: Bank.View[];
}

const enum Mode {
  Bank,
  Account,
}

interface State {
  mode: Mode;
}

const buttons = [
  { element: () => <FormattedMessage {...messages.bank} /> },
  { element: () => <FormattedMessage {...messages.account} /> },
];

export class AddAccountPageComponent extends React.PureComponent<Props, State> {
  static contextTypes = ctx.router;

  state: State = {
    mode: Mode.Bank,
  };

  render() {
    const { router } = this.context as ctx.Router<Params>;
    const bankId = router.route.match.params.bankId;
    const bankView = this.props.banks.find(view => view.bank.id === bankId);
    const mode = this.props.banks.length ? this.state.mode : Mode.Bank;
    return (
      <>
        <ButtonGroup
          onPress={selectedIndex => this.setState({mode: selectedIndex})}
          buttons={buttons}
          selectedIndex={mode}
          selectedIndexes={[mode]}
          disableSelected
        />

        {mode === Mode.Bank
          ? <BankForm />
          : <AccountForm bankId={bankView!.bank.id} {...this.props}/>
        }
      </>
    );
  }
}

export const AddAccountPage = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  })
)(AddAccountPageComponent);
AddAccountPage.displayName = 'AddAccountPage';

const messages = defineMessages({
  account: {
    id: 'AddAccountPage.account',
    defaultMessage: 'Account'
  },
  bank: {
    id: 'AddAccountPage.bank',
    defaultMessage: 'Bank',
  },
});
