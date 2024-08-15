<script>
  import { modalState, recipeState } from '../js/state.svelte';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class={`overlay ${!modalState.isOpen ? 'hidden' : ''}`}
  onclick={() => (modalState.isOpen = false)}
></div>

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 100;
    transition: all 0.5s;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
</style>
