<script>
  // import { onMount } from "svelte";
  // let users = [];
  // let loading = true;
  // onMount(async () => {
  //   let userData = await fetch('https://api.github.com/users');
  //   let gitHubUsers = await userData.json();
  //   users = gitHubUsers;
  //   loading = false;
  // });
  async function getUsers() {
    let userData = await fetch("https://api.github.com/users");
    let gitHubUsers = await userData.json();
    return gitHubUsers;
  }
</script>

<section>
  {#await getUsers()}
    <h1>Loading...</h1>
    {:then users}
    {#each users as user}
    <article class='user'>
      <img src={user.avatar_url} alt={user.login} />
      <div class="user-info">
          <h3>User: {user.login}</h3>
          <a href={user.html_url} class="btn-primary" target="_blank">
              github url
          </a>
      </div>
    </article>
  {/each}
  {:catch error}
  <!-- request was rejected -->
  <p>Something went wrong: {error.message}</p>
  {/await}
</section>
