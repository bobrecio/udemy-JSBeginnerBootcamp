<script>
    import {getContext} from "svelte";
    export let id;
    export let name = "";
    export let amount = 0;
    let showAmount = false;
    function toggleDisplayAmount(){
        showAmount = !showAmount;
    }
    const removeExpense = getContext("remove");
</script>
<article class='single-expense'>
    <div class='expense-info'>
        <h2>{name}<button class='amount-btn' on:click={()=>toggleDisplayAmount()}>
            <i class="fas fa-caret-down"></i>
        </button>
            
        </h2>
        {#if showAmount}
            <h4>amount: ${amount}</h4>
        {/if}
    </div>
    <div class='expense-buttons'>
        <button class='expense-btn edit-btn'>
            <i class="fas fa-pen"></i>
        </button>
        <button class="expense-btn delete-btn" 
            on:click="{() => removeExpense(id)}">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</article>