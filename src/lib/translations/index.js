import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: { lang },
    ro: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: '',
      loader: async () => (
        await import('./en/common.json')
      ).default,
    },
    {
      locale: 'ro',
      key: '',
      loader: async () => (
        await import('./ro/common.json')
      ).default,
    },
  ],
});

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));