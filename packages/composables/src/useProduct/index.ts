import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    if (params.slug) {
      const { slug } = params;
      const productVariants = await context.$spree.api.getProduct({ slug });

      return productVariants;
    } else {
      const { customQuery, ...searchParams } = params;
      const productsResponse = await context.$spree.api.getProducts(searchParams, customQuery);
      const products = productsResponse.data;

      return products;
    }
  }
};

export default useProductFactory<ProductsResponse, any>(params);
