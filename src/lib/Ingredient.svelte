<script>
  // @ts-nocheck
  import fracty from 'fracty';
  import { icons } from '../js/config';
  const { ingredient } = $props();
</script>

<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="{`${icons}#icon-check`}"></use>
  </svg>
  <div class="recipe__quantity">
    {ingredient.quantity ? fracty(ingredient.quantity) : ''}
  </div>
  <div class="recipe__description">
    <span class="recipe__unit">{ingredient.unit}</span>
    {ingredient.description}
  </div>
</li>

<style lang="scss">
  @use '../sass/variables';

  .recipe {
    &__ingredient {
      display: flex;
    }

    &__icon {
      height: 2rem;
      width: 2rem;
      fill: variables.$color-primary;
      padding-right: 1.1rem;
      flex: 0 0 auto;
      margin-top: 0.1rem;
    }

    &__quantity {
      padding-right: 0.5rem;
      flex: 0 0 auto;
    }
  }
</style>
