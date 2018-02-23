const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor');
import { defineMessages } from 'react-intl';
import { iupdate } from '../../iupdate';
import { DbChange } from '../../state/thunks/dbThunks';
import { Record } from '../Record';

export interface Account extends Account.Props, Record<Account.Id, Account.Props> {}

export namespace Account {
  export type Id = ':accountId';

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

  export const generateColor = (type?: Type): string => {
    switch (type) {
      case Type.CHECKING:
        return randomColor({ hue: 'red', luminosity: 'bright' });
      case Type.SAVINGS:
        return randomColor({ hue: 'green', luminosity: 'bright' });
      case Type.MONEYMRKT:
        return randomColor({ hue: 'purple', luminosity: 'bright' });
      case Type.CREDITLINE:
        return randomColor({ hue: 'blue', luminosity: 'bright' });
      case Type.CREDITCARD:
        return randomColor({ hue: 'orange', luminosity: 'bright' });

      default:
        return randomColor({ luminosity: 'bright' });
    }
  };

  export type Query = iupdate.Query<Props>;
  export const table = 'accounts';
  export const schema = Record.genSchema();

  export namespace change {
    export const add = (t: number, account: Account): DbChange => ({
      table,
      t,
      adds: [account]
    });

    export const edit = (t: number, id: Account.Id, q: Query): DbChange => ({
      table,
      t,
      edits: [{ id, q }]
    });

    export const remove = (t: number, id: Account.Id): DbChange => ({
      table,
      t,
      deletes: [id]
    });
  }
}
