<script>
  import { icons } from '../js/config';

  import { searchState } from '../js/state.svelte';

  // console.log(searchState.page);
</script>

<div class="pagination">
  {#if searchState.page > 1}
    <button
      class="btn--inline pagination__btn--prev"
      onclick={() => searchState.page--}
    >
      <svg class="search__icon">
        <use href="{icons}#icon-arrow-left"></use>
      </svg>
      <span>{`Page ${searchState.page - 1}`}</span>
    </button>
  {/if}
  {#if searchState.page < searchState.numOfPages}
    <button
      class="btn--inline pagination__btn--next"
      onclick={() => searchState.page++}
    >
      <span>{`Page ${searchState.page + 1}`} </span>
      <svg class="search__icon">
        <use href="{icons}#icon-arrow-right"></use>
      </svg>
    </button>
  {/if}
</div>

<style lang="scss">
  @use '../sass/variables';

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
