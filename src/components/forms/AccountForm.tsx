import * as React from 'react';
import { Form } from 'react-form';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { RootState, actions, selectors, Bank, Account } from '../../state';
import { /*SelectField,*/ TextField, SubmitButton } from './fields';

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
  key: string;
}

type EnhancedProps = InjectedIntlProps & Props;

const enhance = compose<EnhancedProps, Props>(
  injectIntl,
);

export const AccountFormComponent = enhance(props => {
  const { intl: { formatMessage } } = props;

  return (
    <Form
      defaultValues={{
        name: '',
        color: '',
        type: Account.Type.CHECKING,
        number: '',
        visible: true,
        key: '',
        ...props.edit,
      } as FormValues}
      validateError={(values: FormValues) => ({
        name: !values.name.trim() ? formatMessage(messages.valueEmpty)
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
            bankId: props.bank.id,
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
              placeholder={messages.name}
              // addonBefore={<ColorAddon name='color'/>}
              // autoFocus
            />
            {/* <SelectField
              field='type'
              options={typeOptions}
              clearable={false}
              optionRenderer={accountTypeRenderer}
              valueRenderer={accountTypeRenderer}
              label={messages.type}
            /> */}
            <TextField
              field="number"
              label={messages.number}
              placeholder={messages.number}
            />
            {(formApi.values.type === Account.Type.CHECKING || formApi.values.type === Account.Type.SAVINGS) &&
              <TextField
                field="bankid"
                label={messages.bankid}
                placeholder={messages.bankid}
              />
            }
            {(formApi.values.type === Account.Type.CREDITCARD) &&
              <TextField
                field="key"
                label={messages.key}
                placeholder={messages.key}
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
});

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
  number: {
    id: 'AccountDialog.number',
    defaultMessage: 'Number'
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
  key: {
    id: 'AccountDialog.key',
    defaultMessage: 'Account Key (for international accounts)'
  }
});
