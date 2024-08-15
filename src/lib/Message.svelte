<script>
  import { icons } from '../js/config';
  const { text, modalSmall } = $props();
</script>

<div class="{`message ${modalSmall && 'modalSmall'}`}">
  <div>
    <svg>
      <use href="{icons}#icon-smile"></use>
    </svg>
  </div>
  <p>{text}</p>
</div>

<style lang="scss">
  @use '../sass/variables';

  .message {
    max-width: 40rem;
    margin: 0 auto;
    padding: 5rem 4rem;
    display: flex;

    &.modalSmall {
      @media only screen and (max-width: variables.$bp-small) {
        font-size: 1.9rem;
        width: 80%;
        margin: 60% auto;
        // border: 1px solid #666;
      }
    }

    svg {
      height: 3rem;
      width: 3rem;
      fill: variables.$color-primary;
      transform: translateY(-0.3rem);
    }

    p {
      margin-left: 1.5rem;
      font-size: 1.8rem;
      line-height: 1.5;
      font-weight: 600;
    }
  }
</style>
