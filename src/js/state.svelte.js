import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

function createSearches() {
  let query = $state('');
  let recipes = $state([]);
  let urlId = $state(window.location.hash.slice(1));
  let page = $state(1);

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
    get query() {
      return query;
    },
    set query(value) {
      query = value;
    },
    get recipes() {
      return recipes;
    },
    get urlId() {
      return urlId;
    },
    set urlId(value) {
      urlId = value;
    },
    loadSearchResults,
  };
}
export const searchState = createSearches();
