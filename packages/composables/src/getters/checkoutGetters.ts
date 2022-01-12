import { ShippingRate } from '@vue-storefront/spree-api/src/types';

export const getShippingMethodId = (shippingMethod: ShippingRate): string => shippingMethod?.id || '';

export const getShippingMethodName = (shippingMethod: ShippingRate): string => shippingMethod?.name || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingRate): string => '';

export const getShippingMethodPrice = (shippingMethod: ShippingRate): string => shippingMethod?.cost || '';

export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
