<script>
  import { onMount } from 'svelte';
  import { state } from './js/model.js';
  import './sass/main.scss';
  import Header from './lib/Header.svelte';
  import Recipe from './lib/Recipe.svelte';
  import SearchResults from './lib/SearchResults.svelte';
  import AddRecipeModal from './lib/AddRecipeModal.svelte';

  $: id = window.location.hash.slice(1);
  const storage = localStorage.getItem('bookmarks');
  if (storage) $state.bookmarks = JSON.parse(storage);

  let openModal = () => {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.add-recipe-window');
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  };
</script>

<div class="container">
  <Header {openModal} />
  <SearchResults />
  <Recipe />
  <AddRecipeModal />
</div>
