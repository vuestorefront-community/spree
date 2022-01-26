import { GetProductsParams } from '@vue-storefront/spree-api';
import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { SearchData, SearchParams } from '../types';
import { buildPriceFacet } from './price';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<SearchData>): Promise<SearchData> => {
    const searchParams = params.input as SearchParams;
    const categories = await context.$spree.api.getCategory({ categorySlug: searchParams.categorySlug });

    const getProductsParams: GetProductsParams = {
      categoryId: categories.current?.id,
      term: searchParams.term,
      optionTypeFilters: searchParams.selectedOptionTypeFilters,
      productPropertyFilters: searchParams.selectedProductPropertyFilters,
      priceFilter: searchParams.priceFilter,
      page: searchParams.page,
      itemsPerPage: searchParams.itemsPerPage,
      sort: searchParams.sort
    };
    const productsResponse = await context.$spree.api.getProducts(getProductsParams);

    const { data: products, meta: productsMeta } = productsResponse;

    const priceFacet = buildPriceFacet(searchParams.priceFilter);
    const facets = [...productsMeta.facets, priceFacet];

    return {
      categories,
      products,
      productsMeta,
      facets,
      itemsPerPage: searchParams.itemsPerPage
    };
  }
};

export default useFacetFactory<SearchData>(factoryParams);
