import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import apolloStorybookDecorator from 'apollo-storybook-react';
import faker from 'faker';
import * as React from 'react';
import { AccountsCreatePageComponent } from '../src/components/pages/AccountsCreatePage';
import { Queries } from '../src/db';
import { AppThemeProvider } from '../src/components/Theme';
import typeDefs from '../src/db/schema/schema.graphql';

const makeQuery = <T extends {}>(data: T) => ({
  data,
  loading: boolean('loading', false),
  error: boolean('error', false) ? new Error('Error running query') : undefined,
});

const props = () => ({
  query: makeQuery({
    banks: [
      {
        id: '123',
        name: '1st bank',
        accounts: [
          { id: '123a', name: 'checking' },
          { id: '123b', name: 'savings' },
        ]
      }
    ]
  })
});

storiesOf('Pages/AddAccount', module)
  .addDecorator(story => <AppThemeProvider>{story()}</AppThemeProvider>)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks: {},
    }),
  )
  .add('No banks', () => (
    <AccountsCreatePageComponent
      {...props()}
    />
  ))
  .add('Banks', () => (
    <AccountsCreatePageComponent
      {...props()}
    />
  ))
  ;
