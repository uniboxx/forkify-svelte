<script>
  import { modalState, recipeState } from '../js/state.svelte';
  import AddForm from './AddForm.svelte';
  import Message from './Message.svelte';
  import Overlay from './Overlay.svelte';
  import Spinner from './Spinner.svelte';

  async function handleSubmit(e) {
    e.preventDefault();

    const dataArr = [...new FormData(this)];
    const data = Object.fromEntries(dataArr);
    // await recipeState.uploadRecipe(data);
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve('awaited'), 3000),
    );
  }
</script>

<Overlay />
<div class={`add-recipe-window ${!modalState.isOpen ? 'hidden' : ''}`}>
  <button class="btn--close-modal" onclick={() => (modalState.isOpen = false)}
    >&times;</button
  >
  <AddForm onsubmit={handleSubmit} />
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
