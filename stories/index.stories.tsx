import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { App } from '../src/components';

storiesOf('App', module)
  .add('app', () => <App/>);
