<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { base, RES_PER_PAGE } from '../js/config';
  import { searchState } from '../js/state.svelte';
  import Pagination from './Pagination.svelte';
  import Preview from './Preview.svelte';
  import Spinner from './Spinner.svelte';

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

  <Pagination page="{searchState.page}" />

  <p class="copyright">
    &copy; Copyright by
    <a
      class="twitter-link"
      target="_blank"
      href="https://twitter.com/jonasschmedtman">Jonas Schmedtmann</a
    >. Use for learning or your portfolio. Don't use to teach. Don't claim as
    your own.
  </p>
</div>

<style lang="scss">
  @use '../sass/variables';

  .search-results {
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
  }

  .results {
    list-style: none;
    margin-bottom: 2rem;
  }

  .copyright {
    color: variables.$color-grey-dark-2;
    font-size: 1.2rem;
    padding: 0 3.5rem;
    margin-top: 4rem;
    white-space: pre-wrap;

    @media only screen and (max-width: variables.$bp-small) {
      padding: 0.5rem;
    }

    .twitter-link:link,
    .twitter-link:visited {
      color: variables.$color-grey-dark-2;
    }
  }
</style>
