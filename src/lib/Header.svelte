<script>
  import { base } from '../js/config';
  import SearchForm from './SearchForm.svelte';
  import Nav from './Nav.svelte';
</script>

<header class="header">
  <a href={`${base}`}>
    <img src="{base}/img/logo.png" alt="Logo" class="header__logo" />
  </a>
  <SearchForm />
  <Nav />
</header>

<style lang="scss">
  @use '../sass/variables';

  .header {
    grid-area: head;
    background-color: variables.$color-grey-light-1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media only screen and (max-width: variables.$bp-small) {
    }

    &__logo {
      margin-left: 4rem;
      height: 4.6rem;
      display: block;

      @media only screen and (max-width: variables.$bp-smallest) {
        margin: 1rem;
      }
    }
  }
</style>
