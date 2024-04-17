<script>
    import { t } from '$lib/translations';  
</script>

<!-- todo: add terms of service translations in lib/translations -->

<div class="w-full text-lg text-center">
    <div class="text-center text-5xl font-bold text-teal-700">Globrand</div>
    <h1 class="mt-5">{$t('Terms of Service')}</h1>
    <div class="mt-5">
        <p>{$t('Generative AI models are experimental technology and may provide inaccurate or inappropriate information.')}</p>
        <p>{$t('Don\'t submit sensitive, confidential, or personal information.')}</p>
        <p>{$t('Don\'t rely on this service for any advice.')}</p>
        <p>{$t('We take no responsibility for any damage or loss caused by the use of this service.')}</p>
        <p>{$t('By using this service you agree to our Terms of Service.')}</p>
    </div>
    <button class="mt-5 p-2 bg-transparent border rounded border-teal-700 focus:outline-none text-black dark:text-gray-300" on:click={() => history.back()}>{$t('I understand')}</button>
</div>