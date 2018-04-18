import * as React from 'react';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'recompose';
import { RootState, actions, selectors, Bank, Account, nav } from '../../state';
import { Mutations, Queries, Types } from '../../db';
import { ctx } from '../ctx';
import { List } from '../list';
import { ErrorMessage, typedFields, SelectFieldItem } from './fields';

interface Props {
  accountId?: Account.Id;
  bankId: Bank.Id;
}

interface ComposedProps extends Props {
  query: Queries.Account;
  saveAccount: Mutations.SaveAccount;
}

type FormValues = {
  [P in keyof Types.AccountInput]-?: Types.Account[P]
};

const { Form, SelectField, SubmitButton, TextField } = typedFields<FormValues>();

export const AccountFormComponent: React.SFC<ComposedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
  if (props.saveAccount.called && props.saveAccount.data) {
    return <Redirect to={nav.accountView(props.bankId, props.saveAccount.data.saveAccount!.id)} />;
  }

  if (props.accountId && props.query.error) {
    return <ErrorMessage error={props.query.error} />;
  }

  const edit = props.accountId && props.query.data.account;

  return (
    <Form
      defaultValues={{
        name: edit ? edit.name : Account.defaultValues.name,
        type: edit ? edit.type as any : Account.defaultValues.type,
        color: edit ? edit.color : Account.defaultValues.color,
        number: edit ? edit.number : Account.defaultValues.number,
        visible: edit ? edit.visible : Account.defaultValues.visible,
        bankid: edit ? edit.bankid : Account.defaultValues.bankid,
        key: edit ? edit.key : Account.defaultValues.key,
      }}
      validateError={values => ({
        name: !values.name || !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={input => {
        const variables = {
          bankId: props.bankId,
          accountId: edit ? edit.id : null,
          input,
        };
        props.saveAccount.execute({ variables });
        // if (edit) {
        //   const q = Account.diff(edit, input);
        //   return props.accountUpdate(edit.id, q);
        // } else {
        //   return props.accountCreate(props.bankId, input);
        // }
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
              disabled={props.saveAccount.loading}
              onPress={formApi.submitForm}
              title={edit ? messages.save : messages.create}
            />
          </List>
        </>
      }
    </Form>
  );
};
AccountFormComponent.contextTypes = { ...ctx.intl, ...ctx.router };

export const AccountForm = compose<ComposedProps, Props>(
  Mutations.withSaveAccount('saveAccount'),
  Queries.withAccount('query', ({ accountId }: Props) => accountId && ({ accountId })),
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
