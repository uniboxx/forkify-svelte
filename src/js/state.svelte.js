import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

function createQuery() {
  let query = $state('');

  function assign(newValue) {
    query = newValue;
  }

  return {
    get query() {
      return query;
    },
    assign,
  };
}
export const query = createQuery();

function createResults() {
  let recipes = $state([]);

  async function loadSearchResults(query) {
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

      // state.update(obj=>obj.search.page = 1);
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  }
  return {
    get recipes() {
      return recipes;
    },
    loadSearchResults,
  };
}
export const results = createResults();
