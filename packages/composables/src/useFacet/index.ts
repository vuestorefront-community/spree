import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const categories = await context.$spree.api.getCategory({ categorySlug: params.input.categorySlug, rootCatSlug: params.input.rootCatSlug });
    const productsResponse = await context.$spree.api.getProduct({ categoryId: categories.current.id, page: params.input.page, sort: params.input.sort });
    const products = productsResponse.data;
    const productsMeta = productsResponse.meta;

    return {
      categories,
      products,
      productsMeta
    };
  }
};

export default useFacetFactory<any>(factoryParams);
