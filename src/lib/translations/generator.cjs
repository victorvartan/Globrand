/** 
node --env-file=../../../.env generator.cjs 
This will use Google Translate to generate translations for all languages in the languages.json file.
If you wanto to re-generate files for one or more languages, you can remove the folders for those languages and run the script again. 
 **/

// todo: needs better async handling, see console output when generating the translations...

const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;
const languages = require('./languages.json');

const translate = new Translate({
	credentials: {
		client_email: process.env.GOOGLE_TRANSLATE_CLIENT_EMAIL,
		private_key: process.env.GOOGLE_TRANSLATE_PRIVATE_KEY.replace(/\\n/g, '\n')
	},
	projectid: process.env.GOOGLE_TRANSLATE_PROJECT_ID
});

const getDirectories = (source) =>
	fs
		.readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

const getFiles = (source) =>
	fs
		.readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isFile())
		.map((dirent) => dirent.name);

const existingLanguages = getDirectories(__dirname);
console.log(`=== existing languages: ${existingLanguages.join(', ')}`);

const translationSourceFiles = getFiles(path.join(__dirname, 'en'));
const translationSourceFilesImports = {};
translationSourceFiles.map(
	(file) => (translationSourceFilesImports[file] = require(path.join(__dirname, 'en', file)))
);

languages
	.filter((lang) => !existingLanguages.includes(lang.value))
	.forEach(async (lang) => {
		console.log(`=== generating translations for ${lang.value}...`);

		try {
			const newFolderPath = path.join(__dirname, lang.value);
			if (!fs.existsSync(newFolderPath)) {
				fs.mkdirSync(newFolderPath, { recursive: true });
				console.log(`created folder ${newFolderPath}`);
			}

			const translationOptions = {
				to: lang.value,
				model: 'nmt'
			};

			for (let file of translationSourceFiles) {
				const translationSourceFileImport = translationSourceFilesImports[file];
				const translatedJson = {};
				for (let key of Object.keys(translationSourceFileImport)) {
					let [translations] = await translate.translate(
						translationSourceFileImport[key],
						translationOptions
					);
					translations = Array.isArray(translations) ? translations : [translations];
					if (!!translations && translations.length > 0) {
						translatedJson[key] = translations[0];
						console.log(`"${key}" = "${translations[0]}"`);
					}
				}
				console.log(`translated ${file} to ${lang.value}`);
				fs.writeFileSync(
					path.join(newFolderPath, 'common.json'),
					JSON.stringify(translatedJson, null, 2)
				);
				console.log(`new ${file} file written to ${newFolderPath}`);
			}
		} catch (e) {
			console.log(`!!! EXCEPTION: ${e}`);
		}
	});
