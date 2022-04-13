import { getCurrentInstance } from '@nuxtjs/composition-api';
import type { AgnosticGroupedFacet } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/spree-api';
import type { SearchParams, SearchParamsOptionTypeFilter, SearchParamsProductPropertyFilter } from '@vue-storefront/spree';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy as any;
};

const getOptionTypeFiltersFromURL = (): SearchParamsOptionTypeFilter[] => {
  const instance = getInstance();
  const { query } = instance.$route;

  return Object
    .entries(query)
    .filter(([key]) => key.startsWith('o.'))
    .reduce((filters, [key, value]: [string, string]) => {
      const optionTypeName = key.substring(2);

      if (Array.isArray(value)) {
        return [...filters, ...value.map(e => ({ optionTypeName, optionValueId: parseInt(e, 10) }))];
      } else {
        return [...filters, { optionTypeName, optionValueId: parseInt(value, 10) }];
      }
    }, []);
};

const getProductPropertyFiltersFromURL = (): SearchParamsProductPropertyFilter[] => {
  const instance = getInstance();
  const { query } = instance.$route;
  return Object
    .entries(query)
    .filter(([key]) => key.startsWith('p.'))
    .reduce((filters, [key, value]: [string, string]) => {
      const productPropertyName = key.substring(2);

      if (Array.isArray(value)) {
        return [...filters, ...value.map(e => ({ productPropertyName, productPropertyValue: e }))];
      } else {
        return [...filters, { productPropertyName, productPropertyValue: value }];
      }
    }, []);
};

const useUiHelpers = () => {
  const instance = getInstance();
  const { query, path } = instance.$router.history.current;

  const getFacetsFromURL = (): SearchParams => {
    const categorySlug = path.split('/c/')[1];

    return {
      categorySlug,
      selectedOptionTypeFilters: getOptionTypeFiltersFromURL(),
      selectedProductPropertyFilters: getProductPropertyFiltersFromURL(),
      priceFilter: Array.isArray(query.price) ? query.price[0] : query.price,
      term: query.term || '',
      page: parseInt(query.page, 10) || 1,
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 10,
      sort: query.sort || 'updated_at'
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters) => {
    const queryWithoutFilters = Object.fromEntries(
      Object.entries(query).filter(([key]) => !key.startsWith('o.') && !key.startsWith('p.') && key !== 'price')
    );

    instance.$router.push({ query: { ...queryWithoutFilters, ...filters }});
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    instance.$router.push({ query: { ...query, itemsPerPage }});
  };

  const setTermForUrl = (term: string) => {
    instance.$router.push(path, { query, term });
  };

  const isFacetColor = (facet: AgnosticGroupedFacet): boolean => facet.label === 'Color';

  const isFacetPrice = (facet: AgnosticGroupedFacet): boolean => facet.label === 'Price';

  const getSearchPriceFromUrl = () => {
    const urlPriceRange = getFacetsFromURL().priceFilter;
    if (typeof urlPriceRange !== 'undefined') {
      return urlPriceRange.split(',');
    }
  };

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
    isFacetPrice,
    isFacetCheckbox,
    getSearchTermFromUrl,
    getSearchPriceFromUrl
  };
};

export default useUiHelpers;
