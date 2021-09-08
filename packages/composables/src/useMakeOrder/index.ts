import { Order } from '../types';
import { UseMakeOrder, useMakeOrderFactory, Context } from '@vue-storefront/core';

const factoryParams = {
  make: async (context: Context): Promise<Order> => {
    await context.$spree.api.makeOrder();
    return undefined;
  }
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
