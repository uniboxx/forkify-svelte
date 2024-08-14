<script>
  // @ts-nocheck
  import { query } from '../js/state.svelte';
  import { loadSearchResults } from '../js/model';

  async function getData() {
    return loadSearchResults(query.query);
  }
</script>

<div class="search-results">
  {#await getData() then data}
    <p>{data}</p>
  {/await}
  <ul class="results">
    <!-- 
      <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
          <figure class="preview__fig">
            <img src="src/img/test-1.jpg" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
            <p class="preview__publisher">The Pioneer Woman</p>
            <div class="preview__user-generated">
              <svg>
                <use href="{BASE}/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
       -->
  </ul>

  <div class="pagination">
    <!-- <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="{BASE}/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page 1</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page 3</span>
        <svg class="search__icon">
          <use href="{BASE}/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button> -->
  </div>

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
