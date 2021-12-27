<script>
    import {fly} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import {flip} from 'svelte/animate';
    import SectionTitle from './Title.svelte';
    import Expense from './Expense.svelte';
    export let expenses = [];
</script>
<style>
    h2{
        text-transform: capitalize;
    }
</style>
<section>
    <SectionTitle title="expense list" />
    <ul>
        {#each expenses as expense,index (expense.id)}
        <div 
            in:fly = {{x:-500,delay:(index + 1) *500}} 
            out:fly = {{x:500}}
            animate:flip>
            <Expense {...expense} />
        </div>
            {:else}
            <h2>no expenses in the list</h2>            
        {/each}
    </ul>
</section>
