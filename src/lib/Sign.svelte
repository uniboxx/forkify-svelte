<section id="sign">
  <p>
    Reworked by <a href="https://t.me/unibox">Uniboxx</a> using Svelte 5 RC and scss
  </p>
</section>

<style lang="scss">
  @use '../sass/variables';

  #sign {
    margin-top: 2rem;
    background-color: variables.$color-grey-light-1;
  }

  p {
    font-size: 1.5rem;

    color: variables.$color-primary;
    padding: 1rem 2rem;
  }
  a {
    text-decoration: none;
    color: variables.$color-grey-dark-1;
  }
</style>
