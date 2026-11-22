import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  // the app speaks German first; switch in the toolbar
  globalTypes: {
    locale: {
      description: 'Language',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'de', title: 'Deutsch' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'de' },
  decorators: [
    (Story, context) => {
      const locale = (context.globals.locale as string | undefined) ?? 'de';
      if (i18n.language !== locale) void i18n.changeLanguage(locale);
      return (
        <I18nextProvider i18n={i18n}>
          <LanguageSync locale={locale} />
          <Story />
        </I18nextProvider>
      );
    },
  ],
};

/** Keeps i18next on the toolbar language (the detector may pick the browser language first). */
const LanguageSync = ({ locale }: { locale: string }) => {
  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
  }, [locale]);
  return null;
};

export default preview;
