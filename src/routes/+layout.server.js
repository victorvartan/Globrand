import { loadTranslations, translations, locales, defaultLocale } from '$lib/translations';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, request, cookies }) => {
	const { pathname } = url;

	let language = (cookies.get('language') || '').toLowerCase();
	if (!language) {
		language =
			`${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
	}

	const supportedLocales = locales.get().map((l) => l.toLowerCase());
	if (!supportedLocales.includes(language)) {
		language = defaultLocale;
	}

	await loadTranslations(language, pathname);

	return {
		i18n: { locale: language, route: pathname },
		translations: translations.get()
	};
};
