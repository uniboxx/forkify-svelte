<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { base, RES_PER_PAGE } from '../js/config';
  import { searchState, globalState } from '../js/state.svelte';
  import Pagination from './Pagination.svelte';
  import Preview from './Preview.svelte';
  import Spinner from './Spinner.svelte';
  import Copyright from './Copyright.svelte';
  import Sign from './Sign.svelte';

  async function getPreviews(page) {
    if (searchState.query) await searchState.loadSearchResults();

    return $state.snapshot(searchState.getSearchResultsPage(page));
  }
  function getPageResults(page) {
    return $state.snapshot(searchState.getSearchResultsPage(page));
  }
</script>

<div class="search-results">
  <ul class="results">
    {#await getPreviews(searchState.page)}
      <Spinner />
    {:then previews}
      {#each previews as preview (preview.id)}
        <Preview {preview} {onclick} />
      {/each}
    {/await}
  </ul>

  <Pagination page={searchState.page} />
  {#if screen.width > 600}
    <Sign />
    <Copyright />
  {/if}
</div>

<style lang="scss">
  @use '../sass/variables';

  .search-results {
    padding: 3rem 0;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: variables.$bp-small) {
      padding: 0.5rem;
      margin-bottom: 1rem;
      height: min-content;
    }
  }

  .results {
    list-style: none;
    margin-bottom: 2rem;
  }
</style>
