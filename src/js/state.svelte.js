// @ts-nocheck
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

function createSearches() {
  const resultsPerPage = RES_PER_PAGE;

  let query = $state('');
  let recipes = $state([]);
  let loaded = $state(false);
  let urlId = $state(window.location.hash.slice(1));
  let page = $state(1);
  let numOfPages = $derived(Math.ceil(recipes.length / resultsPerPage));

  async function loadSearchResults() {
    try {
      const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
      // console.log(data.data.recipes);

      recipes = data?.data?.recipes?.map(rec => ({
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      }));
      query = '';

      // state.update(obj=>obj.search.page = 1);
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  }

  function getSearchResultsPage(selectedPage = page) {
    page = selectedPage;

    const start = (page - 1) * resultsPerPage; // 0;
    const end = page * resultsPerPage; // 9;
    return recipes.slice(start, end);
  }

  return {
    get query() {
      return query;
    },
    set query(value) {
      query = value;
    },
    get recipes() {
      return recipes;
    },
    get loaded() {
      return loaded;
    },
    set loaded(value) {
      loaded = value;
    },
    get urlId() {
      return urlId;
    },
    set urlId(value) {
      urlId = value;
    },
    get page() {
      return page;
    },
    set page(value) {
      page = value;
    },
    get numOfPages() {
      return numOfPages;
    },
    loadSearchResults,
    getSearchResultsPage,
  };
}
export const searchState = createSearches();

function createRecipe() {
  let recipe = $state({});
  let bookmarks = $state(JSON.parse(localStorage.getItem('bookmarks')) || []);

  function createRecipeObject(data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  }

  async function loadRecipe(id) {
    try {
      //- RECUPERARE UNA RICETTA DA API (288)
      const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

      recipe = createRecipeObject(data);

      if (bookmarks.some(bookmark => bookmark.id === id)) {
        recipe.bookmarked = true;
      } else recipe.bookmarked = false;

      // console.log(recipe);
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  }

  function updateServings(newServings) {
    recipe.ingredients.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / recipe.servings;
    });

    recipe.servings = newServings;
  }

  function persistBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  function addBookmark(recipe) {
    // add bookmark
    bookmarks.push(recipe);

    // mark current recipe as bookmarked
    recipe.bookmarked = true;
    persistBookmarks();
    // console.log(bookmarks);
  }

  function deleteBookmark(id) {
    const index = bookmarks.findIndex(bookmark => bookmark.id === recipe.id);
    bookmarks.splice(index, 1);
    // mark current recipe as NOT bookmarked
    recipe.bookmarked = false;
    persistBookmarks();
  }

  function clearBookmarks() {
    localStorage.clear('bookmarks');
    bookmarks = [];
    recipe.bookmarked = false;
  }

  async function uploadRecipe(newRecipe) {
    // console.log(Object.entries(newRecipe));

    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient format! Please use correct format :)'
            );
          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });
      const myRecipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: newRecipe.cookingTime,
        servings: newRecipe.servings,
        ingredients,
      };

      const data = await AJAX(`${API_URL}?key=${KEY}`, myRecipe);
      recipe = createRecipeObject(data);
      addBookmark(recipe);

      return `Recipe was successfully uploaded`;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return {
    get recipe() {
      return recipe;
    },
    set recipe(value){
      recipe=value;
    },
    get bookmarks() {
      return bookmarks;
    },
    set bookmarks(value){
      bookmarks=value;
    },
    loadRecipe,
    updateServings,
    addBookmark,
    deleteBookmark,
    clearBookmarks,
    uploadRecipe,
  };
}

export const recipeState = createRecipe();

function createModal() {
  let isOpen = $state(false);

  return {
    get isOpen() {
      return isOpen;
    },
    set isOpen(value) {
      isOpen = value;
    },
  };
}

export const modalState = createModal();
