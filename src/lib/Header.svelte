<script>
  import { BASE } from '../js/config';
  import Form from './Form.svelte';
  import Nav from './Nav.svelte';
</script>

<header class="header">
  <img src="{BASE}/img/logo.png" alt="Logo" class="header__logo" />
  <Form />
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

    &__logo {
      margin-left: 4rem;
      height: 4.6rem;
      display: block;
    }
  }
</style>
