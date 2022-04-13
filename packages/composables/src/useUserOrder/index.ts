/* istanbul ignore file */

import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    const { orderId } = params || {};
    if (orderId) {
      return await context.$spree.api.getOrder({ orderId });
    }
    return await context.$spree.api.getOrders();
  }
};

export default useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);
