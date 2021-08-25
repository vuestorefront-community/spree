/* istanbul ignore file */

import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  searchOrders: async (context: Context): Promise<OrdersResponse> => {
    const orders = await context.$spree.api.getOrders();

    return orders;
  }
};

export default useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);
