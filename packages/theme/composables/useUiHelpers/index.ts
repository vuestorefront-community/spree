import { getCurrentInstance } from '@vue/composition-api';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const getOptionValueIdsFromURL = () => {
  const instance = getInstance();
  const { query } = instance.$route;

  const ids = Object.keys(query).reduce((ids, key) => {
    if (key.startsWith('o.')) return ids.concat(query[key]);
    return ids;
  }, []);

  return ids;
};

const useUiHelpers = () => {
  const instance = getInstance();
  const { query, path } = instance.$router.history.current;

  const getFacetsFromURL = () => {
    const categorySlug = path.substring(3);

    return {
      categorySlug,
      page: query.page || 1,
      sort: query.sort || 'updated_at',
      optionValuesIds: getOptionValueIdsFromURL(),
      price: Array.isArray(query.price) ? query.price[0] : query.price,
      itemsPerPage: query.itemsPerPage || 10,
      term: ''
    };
  };

  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  const changeSorting = (sort) => {
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters) => {
    // TODO: add clearing filters
    instance.$router.push({ query: { ...query, ...filters }});
  };

  const changeItemsPerPage = (itemsPerPage) => {
    instance.$router.push({ query: { ...query, itemsPerPage }});
  };

  // eslint-disable-next-line
const setTermForUrl = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
  };

  // eslint-disable-next-line
const isFacetColor = (facet): boolean => facet.label === 'Color';

  // eslint-disable-next-line
const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = (term) => ({
    ...getFacetsFromURL(),
    categorySlug: 'categories',
    term
  });

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
