import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { AddressWithEmail } from '@vue-storefront/spree-api';

const params: UseShippingParams<AddressWithEmail, any> = {
  load: async (context: Context): Promise<AddressWithEmail> => {
    const checkout = await context.$spree.api.getCheckout();
    return {
      email: checkout.email,
      ...checkout.shippingAddress
    };
  },

  save: async (context: Context, { shippingDetails }: { shippingDetails: AddressWithEmail }): Promise<AddressWithEmail> => {
    await context.$spree.api.saveCheckoutShippingAddress({ shippingAddress: shippingDetails });
    return shippingDetails;
  }
};

export default useShippingFactory<AddressWithEmail, any>(params);
