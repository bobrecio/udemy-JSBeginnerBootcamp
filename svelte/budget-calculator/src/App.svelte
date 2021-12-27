<script>
  // components
  import Navbar from "./Navbar.svelte";
  import ExpensesList from "./ExpensesList.svelte";
  import { setContext } from "svelte";
  import Totals from "./Totals.svelte";
  import ExpenseForm from "./ExpenseForm.svelte";
  // data
  import expensesData from "./expenses.js";
  // variables
  let expenses = [...expensesData];
  // set editing variables
  let setName = "";
  let setAmount = null;
  let setId = null;
  // REACTIVE
  $: isEditing = setId ? true : false;
  $: total = expenses.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
  // functions
  function removeExpense(id) {
    expenses = expenses.filter((item) => item.id != id);
  }
  function clearExpenses() {
    expenses = [];
  }
  function addExpense({ name, amount }) {
    let expense = { id: Math.random() * Date.now(), name, amount };
    expenses = [expense, ...expenses]; // add the obj to the obj-array; works like a push()
  }
  function setModifiedExpense(id) {
    let expense = expenses.find((item) => item.id === id);
    setId = expense.id;
    setName = expense.name;
    setAmount = expense.amount;
  }
  function editExpense({ name, amount }) {
    expenses = expenses.map((item) => {
      return (item.id = setId
        ? { ...item, name: name, amount: amount }
        : { ...item });
    });
    let setName = "";
    let setAmount = null;
    let setId = null;
  }
  setContext("remove", removeExpense);
  setContext("modify", setModifiedExpense);
</script>

<Navbar />
<main class="content">
  <ExpenseForm
    {addExpense}
    name={setName}
    id={setId}
    amount={setAmount}
    {isEditing}
    {editExpense}
  />
  <Totals title="total expenses" {total} />
  <ExpensesList {expenses} />
  <button
    type="button"
    class="btn btn-primary btn-block"
    on:click={clearExpenses}>clear expenses</button
  >
</main>
