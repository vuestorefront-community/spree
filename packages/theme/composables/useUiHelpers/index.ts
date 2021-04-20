import { getCurrentInstance } from '@vue/composition-api';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const getFiltersFromURL = (context) => {
  const { query } = context.$router.history.current;
  const filters = [];

  const keys = Object.keys(query)
    .filter(o => ['color', 'size', 'length'].includes(o));

  keys.forEach(key => {
    Array.isArray(query[key])
      ? filters.push(...query[key])
      : filters.push(query[key]);
  });

  return filters;
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { query, path } = instance.$router.history.current;
    const categorySlug = path.substring(3);

    return {
      categorySlug,
      page: query.page || 1,
      sort: query.sort || 'updated_at',
      filters: getFiltersFromURL(instance)
    };
  };

  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  const changeSorting = (sort) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters) => {
    const { query } = instance.$router.history.current;

    instance.$router.push({ query: { ...query, ...filters } });
  };

  // eslint-disable-next-line
const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
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

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');
  };

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
