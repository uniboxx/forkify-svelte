<script>
  import { state } from '../js/model';
  let value;
  function searchRecipe() {
    $state.search.query = value;
    value = '';
  }
</script>

<form class="search">
  <input
    type="text"
    class="search__field"
    placeholder="Search over 1,000,000 recipes..."
    bind:value
  />
  <button class="btn search__btn" on:click|preventDefault={searchRecipe}>
    <svg viewBox="0 0 24 24">
      <path
        d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"
      />
    </svg>
    <span>Search</span>
  </button>
</form>

<style lang="scss">
  @import '../sass/base';

  .search {
    background-color: #fff;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    padding-left: 3rem;
    transition: all 0.3s;

    &:focus-within {
      transform: translateY(-2px);
      box-shadow: 0 0.7rem 3rem rgba($color-grey-dark-1, 0.08);
    }

    &__field {
      border: none;
      background: none;
      font-family: inherit;
      color: #222;
      font-size: 1.7rem;
      width: 30rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: $color-grey-light-3;
      }

      @media only screen and (max-width: $bp-medium) {
        width: auto;

        &::placeholder {
          color: white;
        }
      }
    }
    %btn {
      background-image: $gradient;
      border-radius: 10rem;
      border: none;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.05);
      }

      &:focus {
        outline: none;
      }

      & > *:first-child {
        margin-right: 1rem;
      }
    }

    .btn {
      @extend %btn;

      padding: 1.5rem 4rem;
      font-size: 1.5rem;
      font-weight: 600;

      svg {
        height: 2.25rem;
        width: 2.25rem;
        fill: currentColor;
      }
    }

    &__btn {
      font-weight: 600;
      font-family: inherit;
    }
  }
</style>
