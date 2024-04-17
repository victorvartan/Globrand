<script>
    import { t } from '$lib/translations';

    export let data = '';
    
    function parseTableData(tableData) {
        const rows = tableData.split('\n').filter(row => row.trim() !== '');
        if (!rows) return {};
        
        const headerCells = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell !== '');
        const dataRows = rows.slice(2).map(row => row.split('|').map(cell => cell.trim()).filter(cell => cell !== ''));
        return { headerCells, dataRows };
    }

    $: parsedData = parseTableData(data);
</script>

<div {...$$restProps}>
{#if !parsedData.dataRows || parsedData.dataRows.length === 0}
    {$t('No data available')}
{:else}
    <table class="w-full border-collapse">
        <thead class="sticky top-0 bg-white dark:bg-gray-950">
            <tr>
                {#each parsedData.headerCells as cell}
                    <th class="text-left p-2">{$t(cell)}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each parsedData.dataRows as row}
                <tr class="hover:bg-teal-100 dark:hover:bg-teal-700">
                    {#each row as cell}
                        <td>{cell}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
</div>