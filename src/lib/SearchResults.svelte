<script>
  // IMPORTS

  import { RES_PER_PAGE, API_URL, KEY } from '../js/config.js';
  import { state } from '../js/model.js';
  import { AJAX } from '../js/helpers';

  import Spinner from './Spinner.svelte';
  import Copyright from './Copyright.svelte';
  import PreviewBookmark from './Preview_bookmark.svelte';

  // VARIABLES

  let numOfPages, highlight;
  $: start = 10 * ($state.search.page - 1);
  $: end = 10 * $state.search.page;

  $: query = $state.search.query;
  $: query && loadSearchResults(query);

  async function loadSearchResults(query) {
    try {
      const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

      const results = data.data?.recipes.map((rec) => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
          selected: false,
        };
      });

      $state.search.results = results;
      numOfPages = Math.ceil($state.search.results.length / RES_PER_PAGE);
      $state.search.page = 1;

      const id = window.location.hash.slice(1);
      if (id) {
        const selEl = $state.search.results.find((res) => res.id === id);
        if (selEl) selEl.selected = true;
      }
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  }
</script>

<div class="search-results">
  {#await loadSearchResults()}
    <Spinner />
  {:then results}
    <ul class="results">
      {#each $state.search.results.slice(start, end) as result}
        <PreviewBookmark
          selected={result.selected}
          id={result.id}
          image={result.image}
          title={result.title}
          publisher={result.publisher}
          key={result.key}
          {highlight}
        />
      {/each}
    </ul>
  {/await}
  <!--- PAGINATION START -->
  <div class="pagination">
    {#if $state.search.results.length > RES_PER_PAGE}
      {#if $state.search.page !== 1}
        <button
          class="btn--inline pagination__btn--prev"
          on:click={() => $state.search.page--}
        >
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left" />
          </svg>
          <span>Page {$state.search.page - 1} / {numOfPages}</span>
        </button>
      {/if}
      {#if $state.search.page !== numOfPages}
        <button
          class="btn--inline pagination__btn--next"
          on:click={() => $state.search.page++}
        >
          <span>Page {$state.search.page + 1} / {numOfPages}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right" />
          </svg>
        </button>
      {/if}
    {/if}
  </div>
  <!--- PAGINATION END -->

  <Copyright />
</div>

<style lang="scss">
  @import '../sass/base';

  .search-results {
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
  }

  .results {
    list-style: none;
    // margin-bottom: 2rem;
  }

  .pagination {
    margin-top: auto;
    padding: 0 3.5rem;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    &__btn {
      &--prev {
        float: left;
      }
      &--next {
        float: right;
      }
    }
  }
</style>
