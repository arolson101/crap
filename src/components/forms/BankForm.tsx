import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { RootState, actions, selectors, nav, Bank, FI, formatAddress } from '../../state';
import { ctx } from '../ctx';
import { List } from '../list';
import { typedFields, SelectFieldItem } from './fields';

interface Props {
  edit?: Bank;
}

interface ConnectedProps extends Props {
  filist: FI[];
  saving: boolean;
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

const {
  Form,
  CheckboxField,
  CollapseField,
  MultilineTextField,
  SelectField,
  SubmitButton,
  TextField,
  UrlField,
} = typedFields<FormValues>();

export const BankFormComponent: React.SFC<ConnectedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
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

        ...props.edit as any,
      }}
      validateError={values => ({
        name: !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={values => {
        if (props.edit) {
          const q = Bank.diff(props.edit, values);
          props.bankUpdate(props.edit.id, q);
        } else {
          const { fi, ...bankProps } = values;
          props.bankCreate({
            ...bankProps,
            accounts: [],
          });
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
            <UrlField
              field="web"
              // favicoName='favicon'
              placeholder={messages.web}
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
            disabled={props.saving}
            onPress={formApi.submitForm}
            title={props.edit ? messages.save : messages.create}
          />
        </>
      }
    </Form>
  );
};
BankFormComponent.contextTypes = { ...ctx.intl, ...ctx.router };

export const BankForm = connect(
  (state: RootState, props: Props) => ({
    filist: selectors.getFIs(state),
    saving: props.edit ? selectors.isBankUpdating(state) : selectors.isBankCreating(state)
  }),
  {
    bankCreate: actions.bankCreateUI,
    bankUpdate: actions.bankUpdateUI,
  }
)(BankFormComponent);
BankForm.displayName = 'BankForm';

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
