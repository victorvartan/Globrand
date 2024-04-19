import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export const analyzeBrandName = async (brandName, answerLanguage = 'en') => {
	if (brandName.toLowerCase() == 'pajero' && answerLanguage == 'en') return analyzeBrandNameTest();

	const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
	brandName = brandName.trim().replace(/"/g, ''); // todo: add a better prompt injection attack guard than just removing the quotes inside brandName

	const [negativeMeaningsRequest, positiveMeaningsRequest, similarNamesRequest] = await Promise.all(
		[
			model.generateContent(`Given a brand name "${brandName}", return a table with newline separated rows for languages where a similar-sounding or spelled name has a negative meaning.
        Each row should have these three columns:
        * Language: The name of the language as written in the ${answerLanguage} locale with its native name in paranthesis e.g., French (Français)
        * Negative Meaning: Negative meaning of the brand name itself or a similar name in that language
        * Translated Meaning: The positive meaning translated into the ${answerLanguage} locale`),
			model.generateContent(`Given a brand name "${brandName}", return a table with newline separated rows for languages where a similar-sounding or spelled name has a positive meaning.
        Each row should have these three columns:
        * Language: The name of the language as written in the ${answerLanguage} locale with its native name in paranthesis e.g., French (Français)
        * Positive Meaning: Positive meaning of the brand name itself or a similar name in that language
        * Translated Meaning: The positive meaning translated into the ${answerLanguage} locale`),
			model.generateContent(`Given a brand name "${brandName}", return a table with at most 10 newline separated rows (no duplicates) with similar-sounding or spelled brand names that you are aware of.
        Each row should have these two columns:
        * Similar brand: The name of the similar brand in its original alphabet
        * Transliteration: The brand name transliterated into the ${answerLanguage} locale alphabet if it's different from the original alphabet`)
		]
	);

	const [negativeMeanings, positiveMeanings, similarNames] = await Promise.all([
		negativeMeaningsRequest.response.text(),
		positiveMeaningsRequest.response.text(),
		similarNamesRequest.response.text()
	]);
	return {
		negativeMeanings,
		positiveMeanings,
		similarNames
	};
};

export const analyzeBrandNameTest = async () => {
	return {
		negativeMeanings:
			' Language | Negative Meaning | Translated Meaning |\n|---|---|---|\n| Spanish (Español) | "Pájaro" means "bird", which may be seen as a weak or insignificant animal. | N/A |\n| Portuguese (Português) | "Pajero" is similar to "pajero", which means "wanker" or "masturbator". | N/A |\n| Italian (Italiano) | "Pajero" is similar to "pagliaccio", which means "clown" or "buffoon". | N/A |\n| German (Deutsch) | "Pajero" is similar to "Parodie", which means "parody" or "spoof". | N/A |\n| Russian (Pусский) | "Pajero" is similar to "пажёръ" (pazhyor), which means "pageboy" or "servant". | N/A |',
		positiveMeanings:
			'| Language | Positive Meaning | Translated Meaning |\n|---|---|---|\n| Spanish | Pajero | Playful, Wanton |\n| Portuguese | Pajero | Playful, Wanton |\n| Catalan | Pajero | Playful, Wanton |\n| Italian | Pajero | Playful, Wanton |\n| French | Pajero | Playful, Wanton |',
		similarNames:
			'| Similar Brand | Transliteration |\n|---|---|\n| Pathfinder | Pathfinder |\n| Montero | Montero |\n| Outlander | Outlander |\n| Shogun | Shogun |\n| Montero Sport | Montero Sport |\n| Prado | Prado |\n| Challenger | Challenger |\n| Discovery | Discovery |\n| Freelander | Freelander |'
	};
};
