import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';

import languages from '$lib/translations/languages.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	log: {
		level: dev ? 'warn' : 'error'
	}
};

config.loaders = languages.map(({ value }) => ({
	locale: value,
	key: '',
	loader: async () => (await import(`./${value}/common.json`)).default
}));

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
