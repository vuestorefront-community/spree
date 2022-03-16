import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';

const params: UseUserShippingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    await context.$spree.api.addAddress(params.address);
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  },

  deleteAddress: async (context: Context) => {
    console.log('Not implemented: Delete saved address');
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  },

  updateAddress: async (context: Context, params?) => {
    await context.$spree.api.updateAddress(params.address);
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  },

  load: async (context: Context) => {
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  },

  setDefaultAddress: async (context: Context) => {
    console.log('Not implemented: Set default saved address');
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  }
};

export default useUserShippingFactory<any, any>(params);
