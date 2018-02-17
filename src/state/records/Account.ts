import * as update from 'immutability-helper';
import { defineMessages } from 'react-intl';
import { Record } from '../Record';

export interface Account extends Account.Props, Record<Account.Props> {}

export namespace Account {
  // see ofx4js.domain.data.banking.AccountType
  export type Type = 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD';
  export const Type = {
    CHECKING: 'CHECKING' as Type,
    SAVINGS: 'SAVINGS' as Type,
    MONEYMRKT: 'MONEYMRKT' as Type,
    CREDITLINE: 'CREDITLINE' as Type,
    CREDITCARD: 'CREDITCARD' as Type,
  };

  export interface Props {
    readonly name: string;
    readonly color: string;
    readonly type: Account.Type;
    readonly number: string;
    readonly visible: boolean;
    readonly bankid: string;
    readonly key: string;
  }

  export const messages = defineMessages({
    CHECKING: {
      id: 'Account.Type.CHECKING',
      defaultMessage: 'Checking'
    },
    SAVINGS: {
      id: 'Account.Type.SAVINGS',
      defaultMessage: 'Savings'
    },
    MONEYMRKT: {
      id: 'Account.Type.MONEYMRKT',
      defaultMessage: 'Money Market'
    },
    CREDITLINE: {
      id: 'Account.Type.CREDITLINE',
      defaultMessage: 'Credit Line'
    },
    CREDITCARD: {
      id: 'Account.Type.CREDITCARD',
      defaultMessage: 'Credit Card'
    }
  });

  export type Query = update.Query<Props>;
  export const table = 'accounts';
  export const schema = { [table]: Record.genSchema() };
}
