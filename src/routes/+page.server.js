import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { isBot } from '$lib/server/GoogleReCaptchaService';
import { analyzeBrandName } from '$lib/server/GoogleGenerativeAIService';
import { getClientIp } from '$lib/server/AuthorizationService';

import { t } from '$lib/translations';

/** @type {import('./$types').Actions} */
export const actions = {
	analyze: async ({ request, cookies }) => {
		if (!env.GEMINI_API_KEY) {
			return fail(500, t('The GEMINI_API_KEY environment variable is not set.'));
		}
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		const userIp = getClientIp(request);
		if (env.RECAPTCHA_SECRET_KEY && (await isBot(data.captchaToken, userIp))) {
			return { ...data, response: '' };
		}
		const language = cookies.get('language') || 'en';
		const response = await analyzeBrandName(data.brandName, language);
		return { ...data, response };
	},
	setlanguage: async ({ request, cookies }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		const language = data.language || 'en';
		cookies.set('language', language, { path: '/' });
		return { language };
	}
};
