import * as React from 'react';
import { Form } from 'react-form';
import { FormattedMessage, defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { RootState, actions, selectors, Bank } from '../../state';
import { SelectField, TextField, CheckboxField, CollapseField, SubmitButton } from './fields';

interface Props {
  bankId?: Bank.Id;
  initialValues?: Partial<FormValues>;
  banks: Bank[];
  bankCreate: (props: Bank.Props) => any;
  bankUpdate: (bankId: Bank.Id, q: Bank.Query) => any;
}

interface FormValues {
  fi: string;

  name: string;
  web: string;
  address: string;
  notes: string;
  favicon: string;

  online: boolean;

  fid: string;
  org: string;
  ofx: string;

  username: string;
  password: string;
}

type EnhancedProps = InjectedIntlProps & Props;

const dummyFIs = ['bank 1', 'bank 2'];

const enhance = compose<EnhancedProps, Props>(
  injectIntl,
);

export const BankFormComponent = enhance(props => {
  const { intl: { formatMessage } } = props;
  return (
    <Form
      defaultValues={{
        fi: '',

        name: '',
        web: '',
        address: '',
        notes: '',

        online: true,

        fid: '',
        org: '',
        ofx: '',

        username: '',
        password: '',

        ...props.initialValues,
      } as FormValues}
      preValidate={({ fi, name, web, address, notes, fid, org, ofx, username, ...rest }: FormValues) => ({
        fi: fi.trim(),

        name: name.trim(),
        web: web.trim(),
        address: address.trim(),
        notes: notes.trim(),

        fid: fid.trim(),
        org: org.trim(),
        ofx: ofx.trim(),

        username: username.trim(),

        ...rest,
      })}
      validateError={(values: FormValues) => ({
        name: !values.name.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={(values: FormValues) => {
        if (props.bankId) {
          const propIfChanged = (key: keyof FormValues) => {
            if (props.initialValues && props.initialValues[key] !== values[key]) {
              return { [key]: { $set: values[key] } };
            } else {
              return {};
            }
          };

          const q: Bank.Query = {
            ...propIfChanged('fi'),

            ...propIfChanged('name'),
            ...propIfChanged('web'),
            ...propIfChanged('address'),
            ...propIfChanged('notes'),

            ...propIfChanged('online'),

            ...propIfChanged('fid'),
            ...propIfChanged('org'),
            ...propIfChanged('ofx'),

            ...propIfChanged('username'),
            ...propIfChanged('password'),
          };

          return props.bankUpdate(props.bankId, q);
        } else {
          const bank: Bank.Props = {
            fi: values.fi,

            name: values.name,
            web: values.web,
            address: values.address,
            notes: values.notes,
            favicon: values.favicon,

            online: values.online,

            fid: values.fid,
            org: values.org,
            ofx: values.ofx,

            username: values.username,
            password: values.password,

            accounts: [],
          };

          return props.bankCreate(bank);
        }
      }}
    >
      {formApi =>
        <>
          <List>
            <SelectField
              field="fi"
              items={dummyFIs.map(fi => ({ label: fi, value: fi }))}
              label={messages.fi}
            />
            <FormattedMessage {...messages.fiHelp}/>
          </List>
          <List>
            <TextField
              field="name"
              label={messages.name}
              placeholder={messages.namePlaceholder}
            />
            <TextField /*UrlField*/
              field="web"
              // favicoName='favicon'
              label={messages.web}
              placeholder={messages.webPlaceholder}
            />
            <TextField
              field="address"
              rows={4}
              label={messages.address}
              placeholder={messages.addressPlaceholder}
            />
            <TextField
              field="notes"
              rows={4}
              label={messages.notes}
              placeholder={messages.notesPlaceholder}
            />
          </List>
          <List>
            <CheckboxField
              field="online"
              label={messages.online}
            />
          </List>
          <CollapseField field="online">
            <List>
              <TextField
                field="username"
                label={messages.username}
                placeholder={messages.usernamePlaceholder}
              />
              <TextField
                secure
                field="password"
                label={messages.password}
                placeholder={messages.passwordPlaceholder}
              />
            </List>
            <List>
              <TextField
                field="fid"
                label={messages.fid}
                placeholder={messages.fidPlaceholder}
              />
              <TextField
                field="org"
                label={messages.org}
                placeholder={messages.orgPlaceholder}
              />
              <TextField
                field="ofx"
                label={messages.ofx}
                placeholder={messages.ofxPlaceholder}
              />
            </List>
          </CollapseField>
          <SubmitButton
            onPress={formApi.submitForm}
            title={props.bankId ? messages.save : messages.create}
          />
        </>
      }
    </Form>
  );
});

export const BankForm = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  }),
  {
    bankCreate: actions.bankCreate,
    bankUpdate: actions.bankUpdate,
  }
)(BankFormComponent);

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
  fi: {
    id: 'BankForm.fi',
    defaultMessage: 'Institution'
  },
  fiHelp: {
    id: 'BankForm.fiHelp',
    defaultMessage: 'Choose a financial institution from the list or fill in the details below'
  },
  fiPlaceholder: {
    id: 'BankForm.fiPlaceholder',
    defaultMessage: 'Select financial institution...'
  },
  name: {
    id: 'BankForm.name',
    defaultMessage: 'Name'
  },
  namePlaceholder: {
    id: 'BankForm.namePlaceholder',
    defaultMessage: 'Bank Name'
  },
  web: {
    id: 'BankForm.web',
    defaultMessage: 'Website'
  },
  webPlaceholder: {
    id: 'BankForm.webPlaceholder',
    defaultMessage: 'www.mybank.com'
  },
  address: {
    id: 'BankForm.address',
    defaultMessage: 'Address'
  },
  addressPlaceholder: {
    id: 'BankForm.addressPlaceholder',
    defaultMessage: '123 Main St.'
  },
  notes: {
    id: 'BankForm.notes',
    defaultMessage: 'Notes'
  },
  notesPlaceholder: {
    id: 'BankForm.notesPlaceholder',
    defaultMessage: 'Enter any notes'
  },
  online: {
    id: 'BankForm.online',
    defaultMessage: 'Online'
  },
  fid: {
    id: 'BankForm.fid',
    defaultMessage: 'Fid'
  },
  fidPlaceholder: {
    id: 'BankForm.fidPlaceholder',
    defaultMessage: '1234'
  },
  org: {
    id: 'BankForm.org',
    defaultMessage: 'Org'
  },
  orgPlaceholder: {
    id: 'BankForm.orgPlaceholder',
    defaultMessage: 'MYBANK'
  },
  ofx: {
    id: 'BankForm.ofx',
    defaultMessage: 'OFX Server'
  },
  ofxPlaceholder: {
    id: 'BankForm.ofxPlaceholder',
    defaultMessage: 'https://ofx.mybank.com'
  },
  username: {
    id: 'BankForm.username',
    defaultMessage: 'Username'
  },
  usernamePlaceholder: {
    id: 'BankForm.usernamePlaceholder',
    defaultMessage: 'Username'
  },
  password: {
    id: 'BankForm.password',
    defaultMessage: 'Required'
  },
  passwordPlaceholder: {
    id: 'BankForm.passwordPlaceholder',
    defaultMessage: 'Password'
  },
});
