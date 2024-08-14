<form class="search">
  <input
    type="text"
    class="search__field"
    placeholder="Search over 1,000,000 recipes..."
  />
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
      width: 30rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: variables.$color-grey-light-3;
      }

      @media only screen and (max-width: variables.$bp-medium) {
        width: auto;

        &::placeholder {
          color: white;
        }
      }
    }

    &__btn {
      font-weight: 600;
      font-family: inherit;
    }
  }
</style>
