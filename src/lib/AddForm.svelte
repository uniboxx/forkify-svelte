<script>
  import { icons } from '../js/config';
  const { onsubmit } = $props();
</script>

<form class="upload" {onsubmit}>
  <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label
      >Title
      <input value="testTitle" required name="title" type="text" />
    </label>
    <label
      >URL
      <input value="testUrl" required name="sourceUrl" type="text" />
    </label>
    <label
      >Image URL
      <input value="testImageUrl" required name="image" type="text" />
    </label>
    <label
      >Publisher
      <input value="testPublisher" required name="publisher" type="text" />
    </label>
    <label
      >Prep time
      <input value="23" required name="cookingTime" type="number" />
    </label>
    <label
      >Servings
      <input value="2" required name="servings" type="number" />
    </label>
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label
      >Ingredient 1
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
    <label
      >Ingredient 2
      <input
        value="1,,Avocado"
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
    <label
      >Ingredient 3
      <input
        value=",,salt"
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
    <label
      >Ingredient 4
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
    <label
      >Ingredient 5
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
    <label
      >Ingredient 6
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'" />
    </label>
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="{icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>
</form>

<style lang="scss">
  @use '../sass/variables';

  .upload {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem 6rem;

    @media only screen and (max-width: variables.$bp-820) {
      grid-template-columns: 1fr;
      justify-content: center;
      justify-items: center;
      gap: 2rem 3rem;
    }

    &__column {
      display: grid;
      grid-template-columns: 1fr 2.8fr;
      align-items: center;
      gap: 1.5rem;

      @media only screen and (max-width: variables.$bp-820) {
        grid-template-columns: 1fr;
        justify-items: center;
        justify-content: center;
      }

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
          color: variables.$color-grey-light-3;
        }

        &:focus {
          outline: none;
          border: 1px solid variables.$color-primary;
          background-color: variables.$color-grey-light-1;
        }
      }

      /* & button {
        grid-column: 1 / span 2;
        justify-self: center;
        margin-top: 1rem;
      } */
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
