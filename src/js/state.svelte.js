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
