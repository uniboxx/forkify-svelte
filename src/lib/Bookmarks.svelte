<script>
  import { onMount } from 'svelte';
  import icons from '../img/icons.svg';
  import { state } from '../js/model.js';
  import PreviewBookmark from './Preview_bookmark.svelte';
  let bookmarks, highlight;
  onMount(() => (bookmarks = $state.bookmarks));

  $: bookmarks = $state.bookmarks;
</script>

<li class="nav__item">
  <button class="nav__btn nav__btn--bookmarks">
    <svg class="nav__icon">
      <use href="src/img/icons.svg#icon-bookmark" />
    </svg>
    <span>Bookmarks</span>
  </button>
  <div class="bookmarks">
    <ul class="bookmarks__list">
      {#if bookmarks.length === 0}
        <div class="message" style="position:relative;top:40px;">
          <div>
            <svg>
              <use href="{icons}#icon-smile" />
            </svg>
          </div>
          <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
        </div>
      {:else}
        {#each bookmarks as bookmark}
          <PreviewBookmark
            selected={bookmark.selected}
            id={bookmark.id}
            image={bookmark.image}
            title={bookmark.title}
            publisher={bookmark.publisher}
            key={bookmark.key}
            {highlight}
          />
        {/each}
      {/if}
    </ul>
  </div>
</li>

<style lang="scss">
  @import '../sass/base';
  @import '../sass/components';

  // @import '../sass/components';
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
        fill: $color-primary;
        margin-right: 0.7rem;
        transform: translateY(-1px);
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: $color-grey-light-2;
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
    box-shadow: 0 0.8rem 5rem 2rem rgba($color-grey-dark-1, 0.1);

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
        background-color: $color-grey-light-2;
      }
    }

    &:hover,
    .nav__btn--bookmarks:hover + & {
      visibility: visible;
      opacity: 1;
    }
  }
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
