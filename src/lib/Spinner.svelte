<script>
  import { icons } from '../js/config';
</script>

<div class="spinner">
  <svg>
    <use href={`${icons}#icon-loader`}></use>
  </svg>
</div>

<style lang="scss">
  @use '../sass/variables';

  .spinner {
    margin: 5rem auto;
    text-align: center;

    svg {
      height: 6rem;
      width: 6rem;
      fill: variables.$color-primary;
      animation: rotate 2s infinite linear;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
