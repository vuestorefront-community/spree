import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams,
  Logger
} from '@vue-storefront/core';

const params: UseUserBillingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    await context.$spree.api.addAddress(params.address);
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  },

  deleteAddress: async (context: Context, { address }) => {
    await context.$spree.api.deleteAddress(address?._id);
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
    Logger.debug('Not implemented: Set default billing address');
    const addresses = await context.$spree.api.getAddresses();
    return { addresses };
  }
};

export default useUserBillingFactory<any, any>(params);
