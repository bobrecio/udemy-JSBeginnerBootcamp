<script>
  import Title from "./Title.svelte";
  let name = "";
  let amount = null;
  //$: console.log({ name, amount });
  $: isEmpty = !name || !amount;
</script>

<!--
<p>{name}</p>
<p>{amount}</p>
-->
<section class="form">
  <Title title="add expense" />
  <form class="expense-form">
    <div class="form-control">
      <label for="name">name</label>
      <input type="text" id="name" bind:value={name} />
    </div>
    <div class="form-control">
      <label for="amount">amount</label>
      <input type="number" id="amount" bind:value={amount} />
    </div>
    {#if isEmpty}
      <p class="form-empty">please fill all fields</p>
    {/if}
    <button type="submit" class="btn btn-block" class:disabled={isEmpty} disabled={isEmpty}>
      add expense
    </button>
    <button type="button" class="close-btn">
      <i class="fas fa-times" />
      close
    </button>
  </form>
</section>
