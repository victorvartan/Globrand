<script>
    export let isLoading = false;
</script>

<button {...$$restProps}>
    <div class="flex justify-center">
        <slot />
        {#if (isLoading)}
            <svg class="animate-spin h-5 w-5 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l5 5a1 1 0 010 1.42l-5 5a1 1 0 01-1.41-1.42L12.59 9H12a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 01-1 1h-1.59l2.3 2.3a1 1 0 01-1.42 1.42l-5-5a1 1 0 01-.29-.71V4a8 8 0 018 8h2.83a1 1 0 01.71 1.7l-5 5a1 1 0 01-1.42 0l-5-5a1 1 0 01-.29-.7H4z"></path>
            </svg>
        {/if}
    </div>
</button>