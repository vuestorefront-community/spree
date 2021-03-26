import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order';
import { Checkout } from '../../types';
import { deserializeAddress } from './address';

export const deserializeCheckout = (_checkout: OrderAttr, included: JsonApiDocument[]): Checkout => {
  const shippingAddressParams = included.find(e => e.type === 'shipping_address');
  const billingAddressParams = included.find(e => e.type === 'billing_address');

  return {
    shippingAddress: shippingAddressParams ? deserializeAddress(shippingAddressParams) : undefined,
    billingAddress: billingAddressParams ? deserializeAddress(billingAddressParams) : undefined
  };
};
