import { Order } from '../types';
import { UseMakeOrder, useMakeOrderFactory, Context } from '@vue-storefront/core';
import useCart from '../useCart';

const factoryParams = {
  provide() {
    return useCart();
  },

  make: async (context: Context): Promise<Order> => {
    await context.$spree.api.makeOrder();
    context.setCart({_id: 0, lineItems: []});
    return undefined;
  }
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
