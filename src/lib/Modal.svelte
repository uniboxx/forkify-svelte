<script>
  import { base } from '../js/config';
  import { modalState, recipeState, searchState } from '../js/state.svelte';
  import AddForm from './AddForm.svelte';
  import Message from './Message.svelte';
  import Overlay from './Overlay.svelte';
  import Spinner from './Spinner.svelte';

  let isSubmitted = $state(false);
  let formData = $state({});

  function handleSubmit(e) {
    e.preventDefault();
    const dataArr = [...new FormData(this)];
    // console.log(dataArr);
    formData = Object.fromEntries(dataArr);
    // console.log(formData);
    isSubmitted = true;
  }

  async function handleUpload(data) {
    try {
      const message = await recipeState.uploadRecipe(data);

      // console.log(recipeState.recipe);
      searchState.urlId = recipeState.recipe.id;
      // window.location.href = `${base}#${recipeState.recipe.id}`;

      setTimeout(() => {
        modalState.isOpen = false;
      }, 3000);
      return message;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setTimeout(() => {
        isSubmitted = false;
      }, 5000);
    }
  }
</script>

<Overlay />
<div class="{`add-recipe-window ${!modalState.isOpen ? 'hidden' : ''}`}">
  <button class="btn--close-modal" onclick="{() => (modalState.isOpen = false)}"
    >&times;</button>
  {#if !isSubmitted}
    <AddForm onsubmit="{handleSubmit}" />
  {:else}
    {#await handleUpload(formData)}
      <Spinner />
    {:then message}
      <Message text="{message}" />
    {:catch message}
      <Message text="{message}" />
    {/await}
  {/if}
</div>

<style lang="scss">
  @use '../sass/variables';

  .add-recipe-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100rem;
    background-color: white;
    border-radius: 9px;

    padding: 5rem 6rem;
    box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.25);
    z-index: 1000;
    transition: all 0.5s;

    @media only screen and (max-width: variables.$bp-820) {
      top: 0;
      left: 0;
      transform: translate(0, 0);
      width: 100%;
      padding: 1rem;
    }

    .btn--close-modal {
      font-family: inherit;
      color: inherit;
      position: absolute;
      top: 0.5rem;
      right: 1.6rem;
      font-size: 3.5rem;
      cursor: pointer;
      border: none;
      background: none;
    }
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
</style>
