import { useBillingFactory, UseBillingParams, Context } from '@vue-storefront/core';
import { Address } from '@vue-storefront/spree-api';

const params: UseBillingParams<Address, any> = {
  load: async (context: Context): Promise<Address> => {
    const checkout = await context.$spree.api.getCheckout();
    return checkout.billingAddress;
  },

  save: async (context: Context, { billingDetails }: { billingDetails: Address }): Promise<Address> => {
    await context.$spree.api.saveCheckoutBillingAddress({ billingAddress: billingDetails });
    return billingDetails;
  }
};

export default useBillingFactory<Address, any>(params);
