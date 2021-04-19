import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { findFacets } from './_utils';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const { categorySlug, rootCatSlug, page, sort, filters } = params.input;

    const categories = await context.$spree.api.getCategory({ categorySlug, rootCatSlug });

    const productsResponse = await context.$spree.api.getProduct({
      categoryId: categories.current.id,
      page,
      sort,
      filters
    });

    const { data: products, meta: productsMeta } = productsResponse;

    return {
      categories,
      products,
      productsMeta,
      facets: findFacets(products)
    };
  }
};

export default useFacetFactory<any>(factoryParams);
