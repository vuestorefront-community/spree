import { getCurrentInstance } from '@vue/composition-api';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const formatKeyName = (key: string) => key.replace('filter[', '').replace(']', '');

const getFiltersFromURL = (context) => {
  const { query } = context.$router.history.current;

  const filters = Object.keys(query)
    .filter(o => o.includes('filter'))
    .reduce((filters, key) => ({
      ...filters,
      [formatKeyName(key)]: query[key]
    }), {});

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

  // eslint-disable-next-line
const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
const changeSorting = (sort) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
const changeFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.changeFilters.');
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
