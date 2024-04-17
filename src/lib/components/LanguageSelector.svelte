<script>
    import { t } from '$lib/translations';

	import { enhance } from '$app/forms';

    const languages = [
{ value:"af", name:"Afrikaans"},
{ value:"ak", name:"Akan"},
{ value:"sq", name:"Albanian - shqip"},
{ value:"am", name:"Amharic - አማርኛ"},
{ value:"ar", name:"Arabic - العربية"},
{ value:"hy", name:"Armenian - հայերեն"},
{ value:"as", name:"Assamese - অসমীয়া"},
{ value:"ay", name:"Aymara - Aymar"},
{ value:"az", name:"Azerbaijani - azərbaycan"},
{ value:"bm", name:"Bambara - bamanakan"},
{ value:"bn", name:"Bangla - বাংলা"},
{ value:"eu", name:"Basque - euskara"},
{ value:"be", name:"Belarusian - беларуская"},
{ value:"bho", name:"Bhojpuri - भोजपुरी"},
{ value:"bs", name:"Bosnian - bosanski"},
{ value:"bg", name:"Bulgarian - български"},
{ value:"my", name:"Burmese - မြန်မာ"},
{ value:"ca", name:"Catalan - català"},
{ value:"ceb", name:"Cebuano"},
{ value:"ckb", name:"Central Kurdish - کوردیی ناوەندی"},
{ value:"zh-CN", name:"Chinese (Simplified) - 中文（简体）"},
{ value:"zh-TW", name:"Chinese (Traditional) - 中文（繁體）"},
{ value:"co", name:"Corsican"},
{ value:"hr", name:"Croatian - hrvatski"},
{ value:"cs", name:"Czech - čeština"},
{ value:"da", name:"Danish - dansk"},
{ value:"dv", name:"Divehi - ދިވެހި"},
{ value:"doi", name:"Dogri - डोगरी"},
{ value:"nl", name:"Dutch - Nederlands"},
{ value:"en", name:"English"},
{ value:"eo", name:"Esperanto - esperanto"},
{ value:"et", name:"Estonian - eesti"},
{ value:"ee", name:"Ewe - Eʋegbe"},
{ value:"fil", name:"Filipino"},
{ value:"fi", name:"Finnish - suomi"},
{ value:"fr", name:"French - français"},
{ value:"gl", name:"Galician - galego"},
{ value:"lg", name:"Ganda - Luganda"},
{ value:"ka", name:"Georgian - ქართული"},
{ value:"de", name:"German - Deutsch"},
{ value:"el", name:"Greek - Ελληνικά"},
{ value:"gu", name:"Gujarati - ગુજરાતી"},
{ value:"ht", name:"Haitian Creole - créole haïtien"},
{ value:"ha", name:"Hausa"},
{ value:"haw", name:"Hawaiian - ʻŌlelo Hawaiʻi"},
{ value:"he", name:"Hebrew - עברית"},
{ value:"hi", name:"Hindi - हिन्दी"},
{ value:"hmn", name:"Hmong"},
{ value:"hu", name:"Hungarian - magyar"},
{ value:"is", name:"Icelandic - íslenska"},
{ value:"ig", name:"Igbo"},
{ value:"ilo", name:"Iloko - Ilokano"},
{ value:"id", name:"Indonesian - Indonesia"},
{ value:"ga", name:"Irish - Gaeilge"},
{ value:"it", name:"Italian - italiano"},
{ value:"ja", name:"Japanese - 日本語"},
{ value:"jv", name:"Javanese - Jawa"},
{ value:"kn", name:"Kannada - ಕನ್ನಡ"},
{ value:"kk", name:"Kazakh - қазақ тілі"},
{ value:"km", name:"Khmer - ខ្មែរ"},
{ value:"rw", name:"Kinyarwanda"},
{ value:"kok", name:"Konkani - कोंकणी"},
{ value:"ko", name:"Korean - 한국어"},
{ value:"kri", name:"Krio"},
{ value:"ku", name:"Kurdish - Kurdî"},
{ value:"ky", name:"Kyrgyz - кыргызча"},
{ value:"lo", name:"Lao - ລາວ"},
{ value:"la", name:"Latin"},
{ value:"lv", name:"Latvian - latviešu"},
{ value:"ln", name:"Lingala - lingála"},
{ value:"lt", name:"Lithuanian - lietuvių"},
{ value:"lb", name:"Luxembourgish - Lëtzebuergesch"},
{ value:"mk", name:"Macedonian - македонски"},
{ value:"mai", name:"Maithili - मैथिली"},
{ value:"mg", name:"Malagasy"},
{ value:"ms", name:"Malay - Melayu"},
{ value:"ml", name:"Malayalam - മലയാളം"},
{ value:"mt", name:"Maltese - Malti"},
{ value:"mni-Mtei", name:"Manipuri (Meitei Mayek) - mni (Mtei)"},
{ value:"mi", name:"Māori"},
{ value:"mr", name:"Marathi - मराठी"},
{ value:"lus", name:"Mizo - Mizo tawng"},
{ value:"mn", name:"Mongolian - монгол"},
{ value:"ne", name:"Nepali - नेपाली"},
{ value:"nso", name:"Northern Sotho"},
{ value:"no", name:"Norwegian - norsk"},
{ value:"ny", name:"Nyanja"},
{ value:"or", name:"Odia - ଓଡ଼ିଆ"},
{ value:"om", name:"Oromo - Oromoo"},
{ value:"ps", name:"Pashto - پښتو"},
{ value:"fa", name:"Persian - فارسی"},
{ value:"pl", name:"Polish - polski"},
{ value:"pt", name:"Portuguese - português"},
{ value:"pa", name:"Punjabi - ਪੰਜਾਬੀ"},
{ value:"qu", name:"Quechua - Runasimi"},
{ value:"ro", name:"Romanian - română"},
{ value:"ru", name:"Russian - русский"},
{ value:"sm", name:"Samoan"},
{ value:"sa", name:"Sanskrit - संस्कृत भाषा"},
{ value:"gd", name:"Scottish Gaelic - Gàidhlig"},
{ value:"sr", name:"Serbian - српски"},
{ value:"sn", name:"Shona - chiShona"},
{ value:"sd", name:"Sindhi - سنڌي"},
{ value:"si", name:"Sinhala - සිංහල"},
{ value:"sk", name:"Slovak - slovenčina"},
{ value:"sl", name:"Slovenian - slovenščina"},
{ value:"so", name:"Somali - Soomaali"},
{ value:"st", name:"Southern Sotho"},
{ value:"es", name:"Spanish - español"},
{ value:"su", name:"Sundanese - Basa Sunda"},
{ value:"sw", name:"Swahili - Kiswahili"},
{ value:"sv", name:"Swedish - svenska"},
{ value:"tg", name:"Tajik - тоҷикӣ"},
{ value:"ta", name:"Tamil - தமிழ்"},
{ value:"tt", name:"Tatar - татар"},
{ value:"te", name:"Telugu - తెలుగు"},
{ value:"th", name:"Thai - ไทย"},
{ value:"ti", name:"Tigrinya - ትግርኛ"},
{ value:"ts", name:"Tsonga - Xitsonga"},
{ value:"tr", name:"Turkish - Türkçe"},
{ value:"tk", name:"Turkmen - türkmen dili"},
{ value:"uk", name:"Ukrainian - українська"},
{ value:"ur", name:"Urdu - اردو"},
{ value:"ug", name:"Uyghur - ئۇيغۇرچە"},
{ value:"uz", name:"Uzbek - o‘zbek"},
{ value:"vi", name:"Vietnamese - Tiếng Việt"},
{ value:"cy", name:"Welsh - Cymraeg"},
{ value:"fy", name:"Western Frisian - Frysk"},
{ value:"xh", name:"Xhosa - IsiXhosa"},
{ value:"yi", name:"Yiddish - ייִדיש"},
{ value:"yo", name:"Yoruba - Èdè Yorùbá"},
{ value:"zu", name:"Zulu - isiZul"}
];

    let languageForm;

    export let language;

    const onlanguagechange = (event) => {
        event.preventDefault();
        languageForm.submit();
    }
</script>

<form method="POST" action="?/setlanguage" use:enhance bind:this={languageForm}>
    <div class="flex w-15 mx-auto">
        <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
            <style> path { fill: teal; }</style>
            <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
        </svg>
        <label for="language" id="targetLanguageLabel" class="ml-1">{$t('Language')}</label>
        
        <select name="language" aria-labelledby="targetLanguageLabel" class="dark: bg-black ml-1" bind:value={language} on:change={onlanguagechange}>
            {#each languages as { value, name }}
                <option value={value}>{name}</option>
            {/each}
        </select>
    </div>
</form>