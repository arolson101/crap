import pick from 'lodash-es/pick';
import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'recompose';
import { RootState, actions, selectors, nav, FI, formatAddress } from '../../state';
import { Mutations, Queries, Types, Bank } from '../../db';
import { ctx } from '../ctx';
import { List } from '../list';
import { ErrorMessage, typedFields, SelectFieldItem } from './fields';

interface Props {
  bankId?: Bank.Id;
}

interface ComposedProps extends Props {
  query: Queries.Bank;
  saveBank: Mutations.SaveBank;
  filist: FI[];
}

type BankInput = {
  [P in keyof Types.BankInput]-?: Types.Bank[P]
};

interface FormValues extends BankInput {
  fi: number;
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

export const BankFormComponent: React.SFC<ComposedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
  if (props.query.loading) {
    return null;
  }

  if (props.bankId && props.query.error) {
    return <ErrorMessage error={props.query.error} />;
  }

  if (props.saveBank.error) {
    return <ErrorMessage error={props.saveBank.error} />;
  }

  if (props.saveBank.called && props.saveBank.data) {
    return <Redirect to={nav.accounts()} />;
  }

  const edit = props.bankId && props.query.data.bank;
  const defaultFi = edit ? props.filist.findIndex(fi => fi.name === edit.name) : 0;
  return (
    <Form
      defaultValues={{
        fi: defaultFi,
        ...(edit ? pick(edit, Object.keys(Bank.defaultValues)) as any : Bank.defaultValues),
      }}
      validateError={values => ({
        name: !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={({fi, ...input}) => {
        const variables = {
          bankId: props.bankId,
          input,
        };
        props.saveBank.execute({ variables });
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
            disabled={props.saveBank.loading}
            onPress={formApi.submitForm}
            title={edit ? messages.save : messages.create}
          />
        </>
      }
    </Form>
  );
};
BankFormComponent.contextTypes = { ...ctx.intl, ...ctx.router };

export const BankForm = compose<ComposedProps, Props>(
  connect(
    (state: RootState, props: Props) => ({
      filist: selectors.getFIs(state),
    })
  ),
  Queries.withBank('query', ({ bankId }: Props) => bankId && ({ bankId })),
  Mutations.withSaveBank('saveBank'),
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
