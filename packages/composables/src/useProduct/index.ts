import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    const { customQuery, ...searchParams } = params;
    const productsResponse = await context.$spree.api.getProduct(searchParams, customQuery);
    const products = productsResponse.data;

    return products;
  }
};

export default useProductFactory<ProductsResponse, any>(params);
