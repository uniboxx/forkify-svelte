<script>
  // @ts-nocheck

  import { searchState } from '../js/state.svelte';
  let input = $state('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    searchState.query = input;
    // console.log(searchState.query);
    input = '';
  }
</script>

<form class="search" onsubmit="{handleSubmit}">
  <input
    type="text"
    class="search__field"
    placeholder="{screen.width > 600
      ? 'Search over 1,000,000 recipes...'
      : 'Search'}"
    bind:value="{input}" />
  <button class="btn search__btn">
    <svg class="search__icon">
      <use href="/img/icons.svg#icon-search"></use>
    </svg>
    <span>Search</span>
  </button>
</form>

<style lang="scss">
  @use '../sass/variables';

  .search {
    background-color: #fff;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    padding-left: 3rem;
    transition: all 0.3s;

    @media only screen and (max-width: variables.$bp-smallest) {
      width: 96%;
      height: 6rem;
      align-items: center;
      font-size: 4rem;
    }

    &:focus-within {
      transform: translateY(-2px);
      box-shadow: 0 0.7rem 3rem rgba(variables.$color-grey-dark-1, 0.08);
    }

    &__field {
      border: none;
      background: none;
      font-family: inherit;
      color: inherit;
      font-size: 1.7rem;
      max-width: 30rem;

      @media only screen and (max-width: variables.$bp-smallest) {
        font-size: 3rem;
      }

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: variables.$color-grey-light-3;
      }
    }

    &__btn {
      font-weight: 600;
      font-family: inherit;
    }
    @media only screen and (max-width: variables.$bp-small) {
      &__field {
        max-width: 50%;
      }
      &__btn {
        max-width: 40%;
        padding: 1rem;
        margin-left: auto;
        font-size: 2rem;
      }
    }
    @media only screen and (max-width: variables.$bp-medium) {
      padding-right: 2rem;
    }
  }
</style>
