import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { AddressWithEmail } from '@vue-storefront/spree-api';
import useCart from '../useCart';

const params: UseShippingParams<AddressWithEmail, any> = {
  provide() {
    return useCart();
  },

  load: async (context: Context): Promise<AddressWithEmail> => {
    const { email, address } = context.cart.value;

    return {
      email,
      ...address.shipping
    };
  },

  save: async (context: Context, { shippingDetails }: { shippingDetails: AddressWithEmail }): Promise<AddressWithEmail> => {
    await context.$spree.api.saveCheckoutShippingAddress({ shippingAddress: shippingDetails });
    const { address } = context.cart.value;

    context.setCart({
      ...context.cart.value,
      address: {
        ...address,
        shipping: shippingDetails
      }
    });

    return shippingDetails;
  }
};

export default useShippingFactory<AddressWithEmail, any>(params);
