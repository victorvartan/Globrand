<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    import { theme } from '$lib/stores/ThemeStore.js';
    import { t } from '$lib/translations';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    onMount(() => {       
        const unsubscribe = theme.subscribe(currentTheme => {
            if (currentTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        window.onunhandledrejection = (e) => {
            handleError(e);
        };

        return () => {
            unsubscribe();
        };
    });

    function handleError(error) {
        console.error('Error:', error);
        toast.push(error?.message ||  error?.reason?.message || error?.reason || $t('An error occurred'), {
            theme: {
                '--toastBackground': '#ff4d4f',
                '--toastColor': '#fff',
            },
        });
    }

    $: if ($page.status != 200) handleError({message: $page.error || $page.form });
</script>

<div class="flex justify-center items-center h-screen">
    <div class="w-full p-1 md:p-10">
        <slot />
    </div>
    <footer class="absolute bottom-2">
        <LanguageSelector language={data.i18n.locale} />
        <div class="text-center mt-2"><a href="/terms-of-service">{$t('Terms of Service')}</a></div>
    </footer>
</div>

<SvelteToast />