import { IPaymentMethods } from '@spree/storefront-api-v2-sdk';
import { PaymentMethods } from '../../types/checkout';

export const deserializePaymentMethods = (
  methods: IPaymentMethods
): PaymentMethods => methods.data.map((method) => ({
  id: method.id,
  type: method.attributes.type,
  label: method.attributes.name,
  description: method.attributes.description,
  preferences: method.attributes.preferences
}));
