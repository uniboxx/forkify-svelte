<script>
  import icons from '../img/icons.svg';
  import { API_URL, KEY } from '../js/config';
  import { createRecipeObject, AJAX } from '../js/helpers';
  import { state } from '../js/model';
  import Recipe from './Recipe.svelte';

  function toggleWindow() {
    document.querySelector('.overlay').classList.toggle('hidden');
    document.querySelector('.add-recipe-window').classList.toggle('hidden');
  }

  async function uploadRecipe() {
    const formEl = document.querySelector('.upload');
    const title = formEl.querySelector('input[name="title"').value;
    const sourceUrl = formEl.querySelector('input[name="sourceUrl"').value;
    const image = formEl.querySelector('input[name="image"').value;
    const publisher = formEl.querySelector('input[name="publisher"').value;
    const cookingTime = formEl.querySelector('input[name="cookingTime"').value;
    const servings = formEl.querySelector('input[name="servings"').value;
    const ingredient1 = formEl.querySelector('input[name="ingredient-1"').value;
    const ingredient2 = formEl.querySelector('input[name="ingredient-2"').value;
    const ingredient3 = formEl.querySelector('input[name="ingredient-3"').value;
    const ingredient4 = formEl.querySelector('input[name="ingredient-4"').value;
    const ingredient5 = formEl.querySelector('input[name="ingredient-5"').value;
    const ingredient6 = formEl.querySelector('input[name="ingredient-6"').value;
    const _ingredients = [
      ingredient1,
      ingredient2,
      ingredient3,
      ingredient4,
      ingredient5,
      ingredient6,
    ];

    const ingredients = _ingredients
      .filter((ing) => ing !== '')
      .map((ing) => {
        const ingArr = ing.split(',');
        return {
          quantity: ingArr[0],
          unit: ingArr[1],
          description: ingArr[2],
        };
      });
    const recipe = {
      title,
      source_url: sourceUrl,
      publisher,
      image_url: image,
      servings,
      cooking_time: cookingTime,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    $state.recipe = createRecipeObject(data);
    $state.recipe.bookmarked = true;
    $state.bookmarks = [...$state.bookmarks, $state.recipe];
    console.log($state.recipe);
    toggleWindow();
  }
</script>

<div class="overlay hidden" on:click={toggleWindow} />
<div class="add-recipe-window hidden">
  <button class="btn--close-modal" on:click={toggleWindow}>&times;</button>
  <form class="upload" method="POST">
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input value="Title23" required name="title" type="text" />
      <label>URL</label>
      <input value="TEST23" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input value="TEST23" required name="image" type="text" />
      <label>Publisher</label>
      <input value="TEST23" required name="publisher" type="text" />
      <label>Prep time</label>
      <input value="23" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input value="23" required name="servings" type="number" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        value="1,,Avocado"
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        value=",,salt"
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>

    <button class="btn upload__btn" on:click|preventDefault={uploadRecipe}>
      <svg>
        <use href="{icons}#icon-upload-cloud" />
      </svg>
      <span>Upload</span>
    </button>
  </form>
</div>

<style lang="scss">
  @import '../sass/base';
  @import '../sass/components';
  .add-recipe-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100rem;
    background-color: white;
    border-radius: 9px;

    padding: 5rem 6rem;
    box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.25);
    z-index: 1000;
    transition: all 0.5s;

    .btn--close-modal {
      font-family: inherit;
      color: inherit;
      position: absolute;
      top: 0.5rem;
      right: 1.6rem;
      font-size: 3.5rem;
      cursor: pointer;
      border: none;
      background: none;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 100;
    transition: all 0.5s;
  }

  .upload {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem 6rem;

    &__column {
      display: grid;
      grid-template-columns: 1fr 2.8fr;
      align-items: center;
      gap: 1.5rem;

      & label {
        font-size: 1.5rem;
        font-weight: 600;
        color: inherit;
      }

      & input {
        font-size: 1.5rem;
        padding: 0.8rem 1rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        transition: all 0.2s;

        &::placeholder {
          color: $color-grey-light-3;
        }

        &:focus {
          outline: none;
          border: 1px solid $color-primary;
          background-color: $color-grey-light-1;
        }
      }

      & button {
        grid-column: 1 / span 2;
        justify-self: center;
        margin-top: 1rem;
      }
    }

    &__heading {
      font-size: 2.25rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 1rem;
      grid-column: 1/-1;
    }

    &__btn {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
</style>
