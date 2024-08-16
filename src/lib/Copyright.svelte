<p class="copyright">
  &copy; Copyright by
  <a
    class="twitter-link"
    target="_blank"
    href="https://twitter.com/jonasschmedtman">Jonas Schmedtmann</a
  >. Use for learning or your portfolio. Don't use to teach. Don't claim as your
  own.
</p>

<style lang="scss">
  @use '../sass/variables';

  .copyright {
    color: variables.$color-grey-dark-2;
    font-size: 1.2rem;
    padding: 0 3.5rem;
    margin-top: 1rem;

    @media only screen and (max-width: variables.$bp-small) {
      padding: 0.5rem 1rem;
    }

    .twitter-link:link,
    .twitter-link:visited {
      color: variables.$color-grey-dark-2;
    }
  }
</style>
