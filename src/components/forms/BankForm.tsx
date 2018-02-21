import * as React from 'react';
import { Form } from 'react-form';
import { FormattedMessage, defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { RootState, actions, selectors, Bank, FI } from '../../state';
import { SelectField, TextField, MultilineTextField, CheckboxField, CollapseField, SubmitButton } from './fields';

interface Props {
  filist: FI[];
  edit?: Bank;
  banks: Bank[];
  bankCreate: (props: Bank.Props) => any;
  bankUpdate: (bankId: Bank.Id, q: Bank.Query) => any;
}

interface FormValues {
  fi: number;

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

const enhance = compose<EnhancedProps, Props>(
  injectIntl,
);

export const BankFormComponent = enhance(props => {
  const { intl: { formatMessage } } = props;
  const defaultFi = props.edit ? props.filist.findIndex(fi => fi.name === props.edit!.name) : 0;

  return (
    <Form
      defaultValues={{
        fi: defaultFi,

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

          const q: Bank.Query = {
            ...propIfChanged('name', true),
            ...propIfChanged('web', true),
            ...propIfChanged('address', true),
            ...propIfChanged('notes', true),

            ...propIfChanged('online'),

            ...propIfChanged('fid', true),
            ...propIfChanged('org', true),
            ...propIfChanged('ofx', true),

            ...propIfChanged('username', true),
            ...propIfChanged('password'),
          };

          return props.bankUpdate(props.edit.id, q);
        } else {
          const bank: Bank.Props = {
            name: values.name.trim(),
            web: values.web.trim(),
            address: values.address.trim(),
            notes: values.notes.trim(),
            favicon: values.favicon.trim(),

            online: values.online,

            fid: values.fid.trim(),
            org: values.org.trim(),
            ofx: values.ofx.trim(),

            username: values.username.trim(),
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
              items={props.filist.map(fi => ({ label: fi.name, value: fi.id }))}
              label={messages.fi}
              onValueChange={(value: number) => {
                const fi = props.filist[value];
                formApi.setValue('name', fi.name || '');
                formApi.setValue('web', fi.profile.siteURL || '');
                formApi.setValue('favicon', '');
                formApi.setValue('address', formatAddress(fi) || '');
                formApi.setValue('fid', fi.fid || '');
                formApi.setValue('org', fi.org || '');
                formApi.setValue('ofx', fi.ofx || '');
              }}
            />
            <FormattedMessage {...messages.fiHelp} />
          </List>
          <List>
            <TextField
              field="name"
              label={messages.name}
              placeholder={messages.namePlaceholder}
            />
            <MultilineTextField
              field="address"
              rows={4}
              placeholder={messages.address}
            />
            <MultilineTextField /*UrlField*/
              field="web"
              // favicoName='favicon'
              placeholder={messages.web}
              rows={1}
            />
            <MultilineTextField
              field="notes"
              rows={4}
              placeholder={messages.notes}
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
            title={props.edit ? messages.save : messages.create}
          />
        </>
      }
    </Form>
  );
});

export const BankForm = connect(
  (state: RootState) => ({
    filist: selectors.getFIs(state),
    banks: selectors.getBanks(state),
  }),
  {
    bankCreate: actions.bankCreate,
    bankUpdate: actions.bankUpdate,
  }
)(BankFormComponent);

const defined = (x: string | undefined | null): boolean => (x !== undefined && x !== null);

const formatAddress = (fi: FI): string => {
  if (fi && fi.profile) {
    return [
      fi.profile.address1,
      fi.profile.address2,
      fi.profile.address3,

      [
        [fi.profile.city, fi.profile.state].filter(defined).join(', '),
        fi.profile.zip
      ].filter(defined).join(' '),

      fi.profile.country
    ].filter(defined).join('\n');
  } else {
    return '';
  }
};

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
  address: {
    id: 'BankForm.address',
    defaultMessage: 'Address'
  },
  web: {
    id: 'BankForm.web',
    defaultMessage: 'URL'
  },
  notes: {
    id: 'BankForm.notes',
    defaultMessage: 'Notes'
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
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'BankForm.passwordPlaceholder',
    defaultMessage: 'Required'
  },
});
