import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const isDark = browser
	? localStorage.getItem('theme') ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false)
	: false;
export const theme = writable(isDark ? 'dark' : 'light');

theme.subscribe((value) => {
	if (browser) return (localStorage.theme = value);
});
