import * as React from 'react';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { RootState, actions, selectors, Bank, Account, nav } from '../../state';
import { ctx } from '../ctx';
import { List } from '../list';
import { typedFields, SelectFieldItem } from './fields';

interface Props {
  edit?: Account;
  bankId: Bank.Id;
}

interface ConnectedProps extends Props {
  accounts: Account[];
  accountUpdate: (id: Account.Id, q: Account.Query) => any;
  accountCreate: (bankId: Bank.Id, props: Account.Props) => any;
}

// typescript 2.8: Mutable<Account.Props>
interface FormValues {
  name: string;
  color: string;
  type: Account.Type;
  number: string;
  visible: boolean;
  bankid: string;
  key: string;
}

const { Form, SelectField, SubmitButton, TextField } = typedFields<FormValues>();

export const AccountFormComponent: React.SFC<ConnectedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
  return (
    <Form
      defaultValues={{
        ...Account.defaultValues,
        ...props.edit as any,
      }}
      validateError={values => ({
        name: !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={async values => {
        if (props.edit) {
          const q = Account.diff(props.edit, values);
          await props.accountUpdate(props.edit.id, q);
          router.history.goBack();
        } else {
          const account = await props.accountCreate(props.bankId, values);
          router.history.replace(nav.accountView(props.bankId, account.id));
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
              items={Object.keys(Account.Type).map((acct: Account.Type): SelectFieldItem => ({
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
              textColor={formApi.values.color}
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
AccountFormComponent.contextTypes = { ...ctx.intl, ...ctx.router };

export const AccountForm: React.ComponentClass<Props> = connect(
  (state: RootState, props: Props) => ({
    accounts: selectors.getAccounts(state, props.bankId),
  }),
  {
    accountUpdate: actions.accountUpdate,
    accountCreate: actions.accountCreate,
  }
)(AccountFormComponent);
AccountForm.displayName = 'AccountForm';

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
