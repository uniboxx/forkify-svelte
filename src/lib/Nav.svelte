<script>
  import { icons } from '../js/config';
</script>

<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item">
      <button class="nav__btn nav__btn--add-recipe">
        <svg class="nav__icon">
          <use href={`${icons}#icon-edit`}></use>
        </svg>
        <span>Add recipe</span>
      </button>
    </li>
    <li class="nav__item">
      <button class="nav__btn nav__btn--bookmarks">
        <svg class="nav__icon">
          <use href="{icons}#icon-bookmark"></use>
        </svg>
        <span>Bookmarks</span>
      </button>
      <div class="bookmarks">
        <ul class="bookmarks__list">
          <div class="message">
            <div>
              <svg>
                <use href="{icons}#icon-smile"></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
          </div>

          <!-- <li class="preview">
              <a class="preview__link" href="#23456">
                <figure class="preview__fig">
                  <img src="src/img/test-1.jpg" alt="Test" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__name">
                    Pasta with Tomato Cream ...
                  </h4>
                  <p class="preview__publisher">The Pioneer Woman</p>
                </div>
              </a>
            </li> -->
        </ul>
      </div>
    </li>
  </ul>
</nav>

<style lang="scss">
  @use '../sass/variables';

  .nav {
    align-self: stretch;
    margin-right: 2.5rem;

    &__list {
      list-style: none;
      display: flex;
      height: 100%;
    }

    &__item {
      position: relative;
    }

    &__btn {
      height: 100%;
      font-family: inherit;
      color: inherit;
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 1.5rem;
      transition: all 0.3s;

      display: flex;
      align-items: center;

      svg {
        height: 2.4rem;
        width: 2.4rem;
        fill: variables.$color-primary;
        margin-right: 0.7rem;
        transform: translateY(-1px);
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: variables.$color-grey-light-2;
      }
    }
  }

  .bookmarks {
    padding: 1rem 0;
    position: absolute;
    // right: 0;
    right: -2.5rem;
    z-index: 10;
    width: 40rem;
    background-color: #fff;
    box-shadow: 0 0.8rem 5rem 2rem rgba(variables.$color-grey-dark-1, 0.1);

    visibility: hidden;
    opacity: 0;
    transition: all 0.5s 0.2s;

    &__list {
      list-style: none;
    }

    &__field {
      cursor: pointer;
      padding: 0 4rem;

      display: flex;
      align-items: center;
      height: 100%;
      transition: all 0.3s;

      &:hover {
        background-color: variables.$color-grey-light-2;
      }
    }

    &:hover,
    .nav__btn--bookmarks:hover + & {
      visibility: visible;
      opacity: 1;
    }
  }
</style>
