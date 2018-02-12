import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import StoryRouter from 'storybook-router';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

addLocaleData(enLocaleData);

// Provide your messages
const messages = {
  'en': { 'button.label': 'Click me!' },
};

const getMessages = (locale) => messages[locale] || "unknown";

// Set intl configuration
setIntlConfig({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  getMessages
});

// Register decorator
addDecorator(withIntl);
addDecorator(StoryRouter());

// automatically import all files ending in *.stories.tsx
const req = require.context('../../stories', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
