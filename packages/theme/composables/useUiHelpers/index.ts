import { getCurrentInstance } from '@vue/composition-api';
import type { AgnosticGroupedFacet } from '@vue-storefront/core';
import type { Category } from '@upsidelab/vue-storefront-spree-api';

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

  const getCatLink = (category: Category): string => {
    return `/c/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters) => {
    // TODO: add clearing filters
    instance.$router.push({ query: { ...query, ...filters }});
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    instance.$router.push({ query: { ...query, itemsPerPage }});
  };

  const setTermForUrl = (term: string) => {
    instance.$router.push(path, { query, term });
  };

  const isFacetColor = (facet: AgnosticGroupedFacet): boolean => facet.label === 'Color';

  const isFacetCheckbox = (facet: AgnosticGroupedFacet): boolean => !isFacetColor(facet);

  const getSearchTermFromUrl = () => getFacetsFromURL().term;

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
