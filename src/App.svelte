<script>
  import Header from './lib/Header.svelte';
  import Modal from './lib/Modal.svelte';
  import Recipe from './lib/Recipe.svelte';
  import SearchResults from './lib/SearchResults.svelte';
  import './sass/_base.scss';
</script>

<div class="container">
  <Header />
  <SearchResults />
  <Recipe />
</div>

<Modal />

<style lang="scss">
  @use './sass/variables';
  /* h1 {
    font-size: 4rem;
    color: variables.$color-primary;
  } */
</style>
