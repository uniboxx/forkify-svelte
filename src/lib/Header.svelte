<script>
  import Search from './Search.svelte';
  import Bookmarks from './Bookmarks.svelte';
  import icons from '../img/icons.svg';
  import logo from '../img/logo.png';

  export let openModal;
</script>

<header class="header">
  <img src={logo} alt="Logo" class="header__logo" />
  <Search />

  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <button class="nav__btn nav__btn--add-recipe" on:click={openModal}>
          <svg class="nav__icon">
            <use href="{icons}#icon-edit" />
          </svg>
          <span>Add recipe</span>
        </button>
      </li>

      <Bookmarks />
    </ul>
  </nav>
</header>

<style lang="scss">
  @import '../sass/base';
  .header {
    grid-area: head;
    background-color: $color-grey-light-1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__logo {
      margin-left: 4rem;
      height: 4.6rem;
      display: block;
    }
  }

  .nav {
    align-self: stretch;
    margin-right: 2.5rem;

    &__list {
      list-style: none;
      display: flex;
      height: 100%;
    }

    &__item {
      position: relative;
    }

    &__btn {
      height: 100%;
      font-family: inherit;
      color: inherit;
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 1.5rem;
      transition: all 0.3s;

      display: flex;
      align-items: center;

      svg {
        height: 2.4rem;
        width: 2.4rem;
        fill: $color-primary;
        margin-right: 0.7rem;
        transform: translateY(-1px);
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: $color-grey-light-2;
      }
    }
  }
</style>
