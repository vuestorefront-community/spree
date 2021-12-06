import { useBillingFactory, UseBillingParams, Context } from '@vue-storefront/core';
import { Address } from '@vue-storefront/spree-api';
import useCart from '../useCart';

const params: UseBillingParams<Address, any> = {
  provide() {
    return useCart();
  },

  load: async (context: Context): Promise<Address> => {
    return context.cart.value.address.billing;
  },

  save: async (context: Context, { billingDetails }: { billingDetails: Address }): Promise<Address> => {
    await context.$spree.api.saveCheckoutBillingAddress({ billingAddress: billingDetails });
    const { address } = context.cart.value;

    context.setCart({
      ...context.cart.value,
      address: {
        ...address,
        billing: billingDetails
      }
    });

    return billingDetails;
  }
};

export default useBillingFactory<Address, any>(params);
