<script>
  import { icons } from '../js/config';

  import { searchState } from '../js/state.svelte';
</script>

{#if searchState.numOfPages}
  <div class="pagination">
    <button
      class={`btn--inline pagination__btn--prev ${searchState.page === 1 && 'hidden'}`}
      onclick={() => searchState.page > 1 && searchState.page--}>
      <svg class="search__icon">
        <use href="{icons}#icon-arrow-left"></use>
      </svg>
      <span>{`Page ${searchState.page - 1}`}</span>
    </button>

    <p id="current-page">{searchState.page} / {searchState.numOfPages}</p>

    <button
      class={`btn--inline pagination__btn--next ${searchState.page === searchState.numOfPages && 'hidden'}`}
      onclick={() => searchState.page++}>
      <span>{`Page ${searchState.page + 1}`} </span>
      <svg class="search__icon">
        <use href="{icons}#icon-arrow-right"></use>
      </svg>
    </button>
  </div>
{/if}

<style lang="scss">
  @use '../sass/variables';

  .pagination {
    margin-top: auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    & > * {
      flex: 1;
    }

    @media only screen and (max-width: variables.$bp-small) {
      margin-top: 1rem;
    }

    /* &::after {
      content: '';
      display: table;
      clear: both;
    } */

    & #current-page {
      text-align: center;
      font-size: 1.5rem;
      border: 1px solid rgba(variables.$color-primary, 0.3);
      border-radius: 10px;
      color: variables.$color-grey-dark-2;
      padding: 0.3rem;
    }

    .hidden {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
