import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { Address } from '@vue-storefront/spree-api';

const params: UseShippingParams<Address, any> = {
  load: async (context: Context): Promise<Address> => {
    const checkout = await context.$spree.api.getCheckout();
    return checkout.shippingAddress;
  },

  save: async (context: Context, { shippingDetails }: { shippingDetails: Address }): Promise<Address> => {
    await context.$spree.api.saveCheckoutShippingAddress({ shippingAddress: shippingDetails });
    return shippingDetails;
  }
};

export default useShippingFactory<Address, any>(params);
