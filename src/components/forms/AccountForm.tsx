import * as React from 'react';
import { Form } from 'react-form';
import { defineMessages } from 'react-intl';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, actions, selectors, Bank, Account } from '../../state';
import { ctx } from '../ctx';
import { SelectField, TextField, SubmitButton } from './fields';

interface Props {
  edit?: Account;
  bank: Bank;
  accounts: Account[];
  accountUpdate: (id: Account.Id, q: Account.Query) => any;
  accountCreate: (bankId: Bank.Id, props: Account.Props) => any;
}

interface FormValues {
  name: string;
  color: string;
  type: Account.Type;
  number: string;
  visible: boolean;
  bankid: string;
  key: string;
}

export const AccountFormComponent: React.SFC<Props> = (props, { intl }: ctx.Intl) => {
  return (
    <Form
      defaultValues={{
        name: '',
        type: Account.Type.CHECKING,
        color: Account.generateColor(Account.Type.CHECKING),
        number: '',
        visible: true,
        key: '',
        ...props.edit,
      } as FormValues}
      validateError={(values: FormValues) => ({
        name: !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={(values: FormValues) => {
        if (props.edit) {
          const propIfChanged = (key: keyof FormValues, trim: boolean = false) => {
            const value = trim ? (values[key] as string).trim() : values[key];
            if (props.edit && props.edit[key] !== value) {
              return { [key]: { $set: value } };
            } else {
              return {};
            }
          };

          const q: Account.Query = {
            ...propIfChanged('name', true),
            ...propIfChanged('color', true),
            ...propIfChanged('type'),
            ...propIfChanged('number', true),
            ...propIfChanged('bankid', true),
            ...propIfChanged('visible'),
            ...propIfChanged('key', true),
          };

          return props.accountUpdate(props.edit.id, q);
        } else {
          const account: Account.Props = {
            name: values.name.trim(),
            color: values.color.trim(),
            type: values.type,
            number: values.number.trim(),
            visible: values.visible,
            bankid: values.bankid.trim(),
            key: values.key.trim(),
          };

          return props.accountCreate(props.bank.id, account);
        }
      }}
    >
      {formApi =>
        <>
          <List>
            <TextField
              field="name"
              label={messages.name}
              placeholder={messages.namePlaceholder}
              autoFocus
            />
            <TextField
              field="number"
              label={messages.number}
              placeholder={messages.numberPlaceholder}
            />
            <SelectField
              field="type"
              items={Object.keys(Account.Type).map((acct: Account.Type): SelectField.Item => ({
                value: acct.toString(),
                label: intl.formatMessage(Account.messages[acct])
              }))}
              label={messages.type}
              onValueChange={(type: Account.Type) => {
                formApi.setValue('color', Account.generateColor(type));
              }}
            />
            <TextField
              field="color"
              label={messages.color}
              placeholder={messages.colorPlaceholder}
              textColor={(formApi.values as FormValues).color}
            />
            {(formApi.values.type === Account.Type.CHECKING || formApi.values.type === Account.Type.SAVINGS) &&
              <TextField
                field="bankid"
                label={messages.bankid}
                placeholder={messages.bankidPlaceholder}
              />
            }
            {(formApi.values.type === Account.Type.CREDITCARD) &&
              <TextField
                field="key"
                label={messages.key}
                placeholder={messages.keyPlaceholder}
              />
            }
            <SubmitButton
              onPress={formApi.submitForm}
              title={props.edit ? messages.save : messages.create}
            />
          </List>
        </>
      }
    </Form>
  );
};
AccountFormComponent.contextTypes = ctx.intl;

export const AccountForm = connect(
  (state: RootState, props: Props) => ({
    accounts: selectors.getAccounts(state, props.bank.id),
  }),
  {
    accountUpdate: actions.accountUpdate,
    accountCreate: actions.accountCreate,
  }
)(AccountFormComponent);

const messages = defineMessages({
  save: {
    id: 'BankForm.save',
    defaultMessage: 'Save'
  },
  create: {
    id: 'BankForm.create',
    defaultMessage: 'Add'
  },
  valueEmpty: {
    id: 'BankForm.valueEmpty',
    defaultMessage: 'Cannot be empty'
  },
  createTitle: {
    id: 'AccountDialog.createTitle',
    defaultMessage: 'Add Account'
  },
  editTitle: {
    id: 'AccountDialog.editTitle',
    defaultMessage: 'Edit Account'
  },
  name: {
    id: 'AccountDialog.name',
    defaultMessage: 'Name'
  },
  namePlaceholder: {
    id: 'AccountDialog.namePlaceholder',
    defaultMessage: 'My Checking'
  },
  number: {
    id: 'AccountDialog.number',
    defaultMessage: 'Number'
  },
  numberPlaceholder: {
    id: 'AccountDialog.numberPlaceholder',
    defaultMessage: '54321'
  },
  type: {
    id: 'AccountDialog.type',
    defaultMessage: 'Type'
  },
  uniqueName: {
    id: 'AccountDialog.uniqueName',
    defaultMessage: 'This account name is already used'
  },
  uniqueNumber: {
    id: 'AccountDialog.uniqueNumber',
    defaultMessage: 'This account number is already used'
  },
  color: {
    id: 'AccountDialog.color',
    defaultMessage: 'Color'
  },
  colorPlaceholder: {
    id: 'AccountDialog.colorPlaceholder',
    defaultMessage: 'red'
  },
  bankid: {
    id: 'AccountDialog.bankid',
    defaultMessage: 'Routing Number',
    description: `Bank identifier, A-9
      Use of this field by country:
      COUNTRY     Interpretation
      BEL         Bank code
      CAN         Routing and transit number
      CHE         Clearing number
      DEU         Bankleitzahl
      ESP         Entidad
      FRA         Banque
      GBR         Sort code
      ITA         ABI
      NLD         Not used (field contents ignored)
      USA         Routing and transit number`
  },
  bankidPlaceholder: {
    id: 'AccountDialog.bankidPlaceholder',
    defaultMessage: '0123456',
  },
  key: {
    id: 'AccountDialog.key',
    defaultMessage: 'Account Key'
  },
  keyPlaceholder: {
    id: 'AccountDialog.keyPlaceholder',
    defaultMessage: '(for international accounts)'
  },
});
