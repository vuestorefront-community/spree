import {
  useShippingProviderFactory,
  UseShippingProviderParams,
  Context
} from '@vue-storefront/core';
import { Shipment, ShippingMethod } from '@vue-storefront/spree-api/src/types';

const params: UseShippingProviderParams<Shipment[], ShippingMethod> = {
  load: async (context: Context) => {
    const shipments = await context.$spree.api.getShipments();
    return shipments;
  },

  save: async (context: Context, { shippingMethod }) => {
    const shipments = await context.$spree.api.saveShippingMethod({
      selectedShippingRates: shippingMethod
    });
    return shipments;
  }
};

export default useShippingProviderFactory<Shipment[], ShippingMethod>(params);
