import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const categories = await context.$spree.api.getCategory({ categorySlug: params.input.categorySlug, rootCatSlug: params.input.rootCatSlug });
    const products = await context.$spree.api.getProduct({ catId: categories.current.id });

    return {
      categories,
      products
    };
  }
};

export default useFacetFactory<any>(factoryParams);
