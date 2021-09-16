import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { buildPriceFacet } from './price';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const { categorySlug, page, sort, optionValuesIds, price, itemsPerPage, term } = params.input;
    const categories = await context.$spree.api.getCategory({ categorySlug });
    const productsResponse = await context.$spree.api.getProducts({
      categoryId: categories.current?.id,
      page,
      sort,
      optionValuesIds,
      price,
      itemsPerPage,
      term
    });

    const { data: products, meta: productsMeta } = productsResponse;

    const priceFacet = buildPriceFacet();
    const facets = [...productsMeta.facets, priceFacet];

    return {
      categories,
      products,
      productsMeta,
      facets,
      itemsPerPage
    };
  }
};

export default useFacetFactory<any>(factoryParams);
