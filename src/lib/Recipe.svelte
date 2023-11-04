<script>
  import { onMount } from 'svelte';
  import icons from '../img/icons.svg';
  import { API_URL, KEY } from '../js/config.js';
  import { state } from '../js/model';
  import { createRecipeObject, AJAX } from '../js/helpers';
  import fracty from 'fracty';
  import Spinner from './Spinner.svelte';

  $: $state.bookmarks && persistBookmarks();
  let hash, id, recipe, servings;

  const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify($state.bookmarks));
  };

  function hashChange() {
    hash = window.location.hash;
    id = hash.slice(1);
    if (id) loadRecipe(id);
  }

  export async function loadRecipe(id) {
    try {
      const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
      $state.recipe = createRecipeObject(data);
      recipe = $state.recipe;
      servings = $state.recipe.servings;
      // console.log(id);
      // console.log($state.bookmarks);
      if ($state.bookmarks?.some((bookmark) => bookmark.id === id)) {
        $state.recipe.bookmarked = true;
      } else $state.recipe.bookmarked = false;
      // console.log($state.recipe);
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  }
  function bookmark() {
    $state.recipe.bookmarked = $state.recipe.bookmarked ? false : true;
    // console.log(id);

    if ($state.recipe.bookmarked) {
      $state.bookmarks = [...$state.bookmarks, recipe];
      $state.bookmarks[$state.bookmarks.length - 1].selected = true;
    } else {
      const index = $state.bookmarks.findIndex((boo) => boo.id === id);
      $state.bookmarks.splice(index, 1);
    }
    // console.log(recipe);
    // console.log($state.bookmarks);
  }

  onMount(hashChange);
</script>

<svelte:window on:hashchange={hashChange} />

<div class="recipe">
  {#if !id}
    <div class="message">
      <div>
        <svg>
          <use href="{icons}#icon-smile" />
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  {:else if !$state.recipe.id}
    <div class="error">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-alert-triangle" />
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
  {:else}
    {#await hashChange}
      <Spinner />
    {:then result}
      <figure class="recipe__fig">
        <img
          src={$state.recipe.image}
          alt={$state.recipe.title}
          class="recipe__img"
        />
        <h1 class="recipe__title">
          <span>{$state.recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="{icons}#icon-clock" />
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes"
            >{$state.recipe.cookingTime}</span
          >
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users" />
          </svg>
          <span class="recipe__info-data recipe__info-data--people"
            >{$state.recipe.servings}</span
          >
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button
              class="btn--tiny btn--update-servings"
              on:click={() => {
                if ($state.recipe.servings > 1) $state.recipe.servings--;
              }}
            >
              <svg>
                <use href="{icons}#icon-minus-circle" />
              </svg>
            </button>
            <button
              class="btn--tiny btn--update-servings"
              on:click={() => $state.recipe.servings++}
            >
              <svg>
                <use href="{icons}#icon-plus-circle" />
              </svg>
            </button>
          </div>
        </div>
        <div class="recipe__user-generated {$state.recipe.key ? '' : 'hidden'}">
          <svg>
            <use href="{icons}#icon-user" />
          </svg>
        </div>
        <button class="btn--round" on:click={bookmark}>
          <svg class="">
            <use
              href="{icons}#icon-bookmark{$state.recipe.bookmarked
                ? '-fill'
                : ''}"
            />
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          {#each $state.recipe.ingredients as ingredient}
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="{icons}#icon-check" />
              </svg>
              <div class="recipe__quantity">
                {(ingredient.quantity / servings) * $state.recipe.servings
                  ? fracty(
                      (ingredient.quantity / servings) * $state.recipe.servings
                    )
                  : ''}
              </div>
              <div class="recipe__description">
                <span class="recipe__unit">{ingredient.unit}</span>
                {ingredient.description}
              </div>
            </li>
          {/each}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">{$state.recipe.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href={$state.recipe.sourceUrl}
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="{icons}#icon-arrow-right" />
          </svg>
        </a>
      </div>
    {/await}
  {/if}
</div>

<style lang="scss">
  @import '../sass/base';
  @import '../sass/components';
  .recipe {
    background-color: $color-grey-light-1;

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
          $color-grad-1,
          $color-grad-2
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
          $color-grad-1,
          $color-grad-2
        );
      }

      @media only screen and (max-width: $bp-medium) {
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
      fill: $color-primary;
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
      background-color: darken($color-grey-light-2, 2%);

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
        fill: $color-primary;
      }
    }

    ///////////
    // INGREDIENTS
    &__ingredients {
      padding: 5rem 8rem;
      font-size: 1.6rem;
      line-height: 1.4;
      background-color: $color-grey-light-2;
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

    &__ingredient {
      display: flex;
    }

    &__icon {
      height: 2rem;
      width: 2rem;
      fill: $color-primary;
      margin-right: 1.1rem;
      flex: 0 0 auto;
      margin-top: 0.1rem;
    }

    &__quantity {
      margin-right: 0.5rem;
      flex: 0 0 auto;
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
      color: $color-grey-dark-2;
    }

    &__publisher {
      font-weight: 700;
    }
  }
</style>
