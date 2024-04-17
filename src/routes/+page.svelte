<script>
    import { env } from '$env/dynamic/public';
    import { enhance } from '$app/forms';
    import { t } from '$lib/translations';
	import Table from '$lib/components/Table.svelte';
  
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={env.PUBLIC_RECAPTCHA_SITE_KEY}"></script>
</svelte:head>

<div class="h-1/4 w-full">
    <h1 class="text-center text-5xl font-bold text-teal-700" name="Globrand"><a href="/">Globrand</a></h1>
    <form name="analyze-form" method="POST" action="?/analyze" class="mt-10 justify-center" use:enhance={async ({ formData }) => {
            await new Promise((resolve) => { window.grecaptcha.ready(resolve); });
            const captchaToken = await window.grecaptcha.execute(env.PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' });
            formData.append('captchaToken', captchaToken);
        }}>
        <div class="flex justify-center">
            <!-- svelte-ignore a11y-autofocus -->
            <input type="text" 
                name="brandName" 
                value={form?.brandName || null}
                placeholder="{$t('Enter your brand name')}"
                maxlength="100"
                required
                autofocus
                class="p-2 w-96 text-lg bg-transparent border rounded-xl border-teal-700 focus:outline-none dark:focus:bg-gray-800 text-black dark:text-white" />
        </div>
        <div class="flex justify-center mt-5">
            <button type="submit"
                    class="g-recaptcha p-2 w-80 text-lg bg-transparent border rounded border-teal-700 focus:outline-none text-black dark:text-gray-300">
                {$t('Analyze brand name')}
            </button>
        </div>
    </form>
</div>

{#if (form?.response)}
    <div class="mt-5">
        <Table data={form?.response?.negativeMeanings} class="overflow-y-auto h-44" />
    </div>
    <div class="mt-5">
        <Table data={form?.response?.positiveMeanings} class="overflow-y-auto h-44" />
    </div>
    <div class="mt-5">
        <Table data={form?.response?.similarNames} class="overflow-y-auto h-44" />
    </div>
{/if}