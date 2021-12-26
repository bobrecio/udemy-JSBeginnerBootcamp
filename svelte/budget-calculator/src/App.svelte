<script>
  // components
  import Navbar from "./Navbar.svelte";
  import ExpensesList from "./ExpensesList.svelte";
  import {setContext} from "svelte";
  import Totals from "./Totals.svelte";
  import ExpenseForm from "./ExpenseForm.svelte";
  // data
  import expensesData from "./expenses.js";
  // variables
  let expenses = [...expensesData];
  // REACTIVE
  $: total = expenses.reduce((acc, curr) => {
	  return (acc += curr.amount)
  }, 0)
  // functions
  function removeExpense(id) {
	  expenses = expenses.filter(item => item.id != id);
  }
  function clearExpenses() {
	  expenses = [];
  }
  setContext("remove", removeExpense);
</script>

<Navbar />
<main class="content">
	<ExpenseForm />
	<Totals title="total expenses" {total} />
  <ExpensesList {expenses} />
  <button type="button" class="btn btn-primary btn-block" on:click="{clearExpenses}">clear expenses</button>
</main>
