import apolloStorybookDecorator from 'apollo-storybook-react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountsCreatePageComponent } from '../src/components/pages/AccountsCreatePage';
import { Queries } from '../src/db';
import typeDefs from '../src/db/schema/schema.graphql';

const mocks = {
  Query: () => {
    return {
      banks: () => [
        {
          id: '123',
          name: '1st bank',
          accounts: [
            { id: '123a', name: 'checking' },
            { id: '123b', name: 'savings' },
          ]
        }
      ],
    };
  },
};

const makeQuery = <T extends {}>(data: T) => ({
  data,
  loading: false,
  error: undefined,
});

const props = {
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
};

storiesOf('Pages/AddAccount', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add('No banks', () => (
    <AccountsCreatePageComponent
      {...props}
    />
  ))
  .add('Banks', () => (
    <AccountsCreatePageComponent
      {...props}
    />
  ))
  ;
