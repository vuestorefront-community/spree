import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { findFacets } from './_utils';

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

    return {
      categories,
      products,
      productsMeta,
      facets: findFacets(products),
      itemsPerPage
    };
  }
};

export default useFacetFactory<any>(factoryParams);
