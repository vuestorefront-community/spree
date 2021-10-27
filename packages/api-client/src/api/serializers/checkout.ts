import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order';
import { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships';
import { Checkout } from '../../types';
import { deserializeAddress } from './address';

export const deserializeCheckout = (checkout: OrderAttr, included: JsonApiDocument[]): Checkout => {
  const shippingAddressRelationship = checkout.relationships.shipping_address.data as RelationType;
  const billingAddressRelationship = checkout.relationships.billing_address.data as RelationType;

  const shippingAddressId = shippingAddressRelationship?.id;
  const billingAddressId = billingAddressRelationship?.id;

  const shippingAddressParams = included.find(e => e.type === 'address' && e.id === shippingAddressId);
  const billingAddressParams = included.find(e => e.type === 'address' && e.id === billingAddressId);

  return {
    shippingAddress: shippingAddressParams ? deserializeAddress(shippingAddressParams) : undefined,
    billingAddress: billingAddressParams ? deserializeAddress(billingAddressParams) : undefined
  };
};
