<script>
  import icons from '../img/icons.svg';
  import { state } from '../js/model';
  export let selected, id, image, title, publisher, key;
  export function highlight(e) {
    let selEl;
    const elId = e.target
      .closest('.preview__link')
      .getAttribute('href')
      .slice(1);
    $state.search.results.forEach((res) => (res.selected = false));
    $state.bookmarks.forEach((res) => (res.selected = false));

    selEl =
      $state.search.results.find((el) => el.id === elId) ||
      $state.bookmarks.find((el) => el.id === elId);

    selEl.selected = true;
    $state.bookmarks?.find((el) => el.id === elId)
      ? ($state.bookmarks.find((el) => el.id === elId).selected = true)
      : null;
  }
</script>

<li class="preview">
  <a
    class="preview__link {selected && 'preview__link--active'}"
    href="#{id}"
    on:click={highlight}
  >
    <figure class="preview__fig">
      <img src={image} alt={title} />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">{title}</h4>
      <p class="preview__publisher">{publisher}</p>
      {#if key}
        <div class="preview__user-generated">
          <svg>
            <use href="{icons}#icon-user" />
          </svg>
        </div>
      {/if}
    </div>
  </a>
</li>

<style lang="scss">
  @import '../sass/base';
  .preview {
    &__link {
      &:link,
      &:visited {
        display: flex;
        align-items: center;
        padding: 1.5rem 3.25rem;
        transition: all 0.3s;
        border-right: 1px solid #fff;
        text-decoration: none;
      }

      &:hover {
        background-color: $color-grey-light-1;
        transform: translateY(-2px);
      }

      &--active {
        background-color: $color-grey-light-1;
      }
    }

    &__fig {
      flex: 0 0 5.8rem;
      border-radius: 50%;
      overflow: hidden;
      height: 5.8rem;
      margin-right: 2rem;
      position: relative;
      backface-visibility: hidden;

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
        opacity: 0.4;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s;
      }
    }

    &__data {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 2rem;
      row-gap: 0.1rem;
      align-items: center;
    }

    &__title {
      grid-column: 1/-1;
      font-size: 1.45rem;
      color: $color-primary;
      text-transform: uppercase;
      font-weight: 600;

      // This is how text is truncated!
      text-overflow: ellipsis;
      max-width: 25rem;
      white-space: nowrap;
      overflow: hidden;
    }

    &__publisher {
      font-size: 1.15rem;
      color: $color-grey-dark-2;
      text-transform: uppercase;
      font-weight: 600;
    }

    &__user-generated {
      background-color: darken($color-grey-light-2, 2%);

      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      width: 2rem;
      border-radius: 10rem;

      margin-left: auto;
      margin-right: 1.75rem;

      svg {
        height: 1.2rem;
        width: 1.2rem;
        fill: $color-primary;
      }
    }
  }
</style>
