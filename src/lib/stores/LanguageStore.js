import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const DEFAULT_LANGUAGE = 'en';

function getLanguage() {
	const language = browser
		? localStorage.getItem('language') ||
			(navigator.language || navigator.userLanguage)?.split('-')[0] ||
			DEFAULT_LANGUAGE
		: DEFAULT_LANGUAGE;
	console.log(language);
	return language;
}

export const language = writable(getLanguage());

language.subscribe((value) => {
	if (browser) return (localStorage.language = value);
});
