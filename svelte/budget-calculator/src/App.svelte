<script>
  //import Github from './Github.svelte';
  import GithubAwit from './GithubAwait.svelte';
  // components
  import Navbar from "./Navbar.svelte";
  import ExpensesList from "./ExpensesList.svelte";
  import { setContext, onMount, afterUpdate } from "svelte";
  import Totals from "./Totals.svelte";
  import ExpenseForm from "./ExpenseForm.svelte";
  import Modal from "./Modal.svelte";
import GithubAwait from './GithubAwait.svelte';
  // data
  //import expensesData from "./expenses.js"; // for testing/dev
  // variables
  let expenses = [];
  // set editing variables
  let setName = "";
  let setAmount = null;
  let setId = null;
  // toggle form variables
  let isFormOpen = false;
  // REACTIVE
  $: isEditing = setId ? true : false;
  $: total = expenses.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
  // functions
  function showForm() {
    isFormOpen = true;
  }
  function hideForm() {
    isFormOpen = false;
    setName = "";
    setAmount = null;
    setId = null;
  }
  function removeExpense(id) {
    expenses = expenses.filter((item) => item.id != id);
    // setLocalStorage(); <-- this is handled in afterUpdate()
  }
  function clearExpenses() {
    expenses = [];
    // setLocalStorage(); <-- this is handled in afterUpdate()
  }
  function addExpense({ name, amount }) {
    let expense = { id: Math.random() * Date.now(), name, amount };
    expenses = [expense, ...expenses]; // add the obj to the obj-array; works like a push()
    // setLocalStorage(); <-- this is handled in afterUpdate()
  }
  function setModifiedExpense(id) {
    let expense = expenses.find((item) => item.id === id);
    setId = expense.id;
    setName = expense.name;
    setAmount = expense.amount;
    showForm();
  }
  function editExpense({ name, amount }) {
    expenses = expenses.map((item) => {
      return item.id === setId
        ? { ...item, name: name, amount: amount }
        : { ...item };
    });
    // setLocalStorage(); <-- this is handled in afterUpdate()
    setName = "";
    setAmount = null;
    setId = null;
  }

  // context
  setContext("remove", removeExpense);
  setContext("modify", setModifiedExpense);

  // localstorage
  function setLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  onMount(() => {
    expenses = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
  });

  afterUpdate(() => {
    console.count("afterUpdate()");
    setLocalStorage();
  });
</script>

<Navbar {showForm} />
<main class="content">
  <!-- <Github /> -->
  <!-- <GithubAwait /> -->
  {#if isFormOpen}
    <Modal>
      <ExpenseForm
        {addExpense}
        name={setName}
        id={setId}
        amount={setAmount}
        {isEditing}
        {editExpense}
        {hideForm}
        />
      </Modal>
  {/if}
  <Totals title="total expenses" {total} />
  <ExpensesList {expenses} />
  <button
    type="button"
    class="btn btn-primary btn-block"
    on:click={clearExpenses}>clear expenses</button
  >
</main>
<!-- <Modal>
  <h2 slot=header>Modal Header</h2>
  <p slot=body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam doloremque consectetur perferendis modi expedita quis ullam ipsa dolorem sapiente architecto.</p>
  <h3 slot=footer>&copy;2021 BobDeBexar</h3>
</Modal> -->
