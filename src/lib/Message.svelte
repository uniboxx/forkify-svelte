<script>
  import { icons } from '../js/config';
  const { text } = $props();
</script>

<div class="message">
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
