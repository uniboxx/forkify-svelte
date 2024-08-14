<script>
  // @ts-nocheck

  import { icons } from '../js/config';
  import { searchState, recipeState } from '../js/state.svelte';
  import Ingredient from './Ingredient.svelte';
  import Spinner from './Spinner.svelte';

  async function getRecipe() {
    // console.log(searchState.urlId);
    await recipeState.loadRecipe(searchState.urlId);

    const recipe = $state.snapshot(recipeState.recipe);
    console.log(recipe);
    return recipe;
  }
</script>

<div class="recipe">
  {#if !searchState.urlId}
    <div class="message">
      <div>
        <svg>
          <use href={`${icons}#icon-smile`}></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  {:else}
    {#await getRecipe()}
      <Spinner />
    {:then recipe}
      <figure class="recipe__fig">
        <img src={recipe.image} alt={recipe.title} class="recipe__img" />
        <h1 class="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href={`${icons}#icon-clock`}></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes"
            >{recipe.cookingTime}</span
          >
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href={`${icons}#icon-users`}></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people"
            >{recipe.servings}</span
          >
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div class={`recipe__user-generated ${recipe.key ? '' : 'hidden'}`}>
          <svg>
            <use href={`${icons}#icon-user`}></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use
              href={`${icons}#icon-bookmark${recipe.bookmarked ? '-fill' : ''}`}
            ></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          {#each recipe.ingredients as ingredient (ingredient)}
            <Ingredient {ingredient} />
          {/each}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">The Pioneer Woman</span>. Please check
          out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href={`${icons}#icon-arrow-right`}></use>
          </svg>
        </a>
      </div>
    {/await}
  {/if}
</div>

<style lang="scss">
  @use '../sass/variables';

  .recipe {
    background-color: variables.$color-grey-light-1;

    ///////////
    // FIGURE
    &__fig {
      height: 32rem;
      position: relative;
      // transform: scale(1.04) translateY(-1px);
      transform-origin: top;

      &::before {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(
          to right bottom,
          variables.$color-grad-1,
          variables.$color-grad-2
        );
        opacity: 0.6;
      }
    }

    &__img {
      width: 100%;
      display: block;
      height: 100%;
      object-fit: cover;
    }

    &__title {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 20%) skewY(-6deg);
      color: #fff;
      font-weight: 700;
      font-size: 3.25rem;
      text-transform: uppercase;
      width: 50%;
      line-height: 1.95;
      text-align: center;

      span {
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        padding: 1.3rem 2rem;
        background-image: linear-gradient(
          to right bottom,
          variables.$color-grad-1,
          variables.$color-grad-2
        );
      }

      @media only screen and (max-width: variables.$bp-medium) {
        width: 70%;
      }
    }

    ///////////
    // DETAILS
    &__details {
      display: flex;
      align-items: center;
      padding: 7.5rem 8rem 3.5rem 8rem;
    }

    &__info {
      font-size: 1.65rem;
      text-transform: uppercase;
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-right: 4.5rem;
      }
    }

    &__info-icon {
      height: 2.35rem;
      width: 2.35rem;
      fill: variables.$color-primary;
      margin-right: 1.15rem;
    }

    &__info-data {
      margin-right: 0.5rem;
      font-weight: 700;
    }

    &__info-buttons {
      display: flex;
      margin-left: 1.6rem;
      transform: translateY(-1px);
    }

    &__user-generated {
      background-color: darken(variables.$color-grey-light-2, 2%);

      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      width: 4rem;
      border-radius: 10rem;

      margin-left: auto;
      margin-right: 1.75rem;

      svg {
        height: 2.25rem;
        width: 2.25rem;
        fill: variables.$color-primary;
      }
      &.hidden {
        visibility: hidden;
        opacity: 0;
      }
    }

    ///////////
    // INGREDIENTS
    &__ingredients {
      padding: 5rem 8rem;
      font-size: 1.6rem;
      line-height: 1.4;
      background-color: variables.$color-grey-light-2;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__ingredient-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem 3rem;
      list-style: none;
    }

    ///////////
    // DIRECTIONS
    &__directions {
      padding: 5rem 10rem;
      padding-bottom: 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__directions-text {
      font-size: 1.7rem;
      text-align: center;
      margin-bottom: 3.5rem;
      color: variables.$color-grey-dark-2;
    }

    &__publisher {
      font-weight: 700;
    }
  }
</style>
