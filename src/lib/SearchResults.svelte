<script>
  // @ts-nocheck
  import { base } from '../js/config';
  import { searchState } from '../js/state.svelte';
  import Result from './Result.svelte';
  import Spinner from './Spinner.svelte';

  async function getRecipes() {
    if (!searchState.query) return;
    console.log(searchState.query);

    await searchState.loadSearchResults(searchState.query);

    return $state.snapshot(searchState.recipes);
  }
</script>

<div class="search-results">
  <ul class="results">
    {#await getRecipes()}
      <Spinner />
    {:then recipes}
      {#each recipes as recipe (recipe.id)}
        <Result {recipe} />
      {/each}
    {/await}
  </ul>

  <!-- <div class="pagination">
    <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="{base}/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page 1</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page 3</span>
        <svg class="search__icon">
          <use href="{base}/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
  </div> -->

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

  /* .pagination {
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
  } */

  .copyright {
    color: variables.$color-grey-dark-2;
    font-size: 1.2rem;
    padding: 0 3.5rem;
    margin-top: 4rem;

    .twitter-link:link,
    .twitter-link:visited {
      color: variables.$color-grey-dark-2;
    }
  }
</style>
