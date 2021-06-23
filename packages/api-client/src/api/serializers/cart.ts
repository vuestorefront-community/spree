/* eslint-disable camelcase */

import { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order';
import { CouponCode as CouponCodeAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass';
import { ApiConfig, Cart, CouponCode, LineItem } from '../../types';

export const deserializeLineItem = (lineItem: any, _config: ApiConfig): LineItem => {
  return {
    _id: parseInt(lineItem.id, 10),
    _variantId: parseInt(lineItem.relationships.variant.data.id, 10),
    _description: '',
    _categoriesRef: [],
    name: lineItem.attributes.name,
    sku: '',
    images: [],
    price: {
      original: lineItem.attributes.price,
      current: lineItem.attributes.price
    },
    qty: lineItem.attributes.quantity
  };
};

const filterIncludedLineItems = (included: any[]) => {
  return included.filter(e => e.type === 'line_item');
};

export const deserializeCart = (apiCart: OrderAttr, included: any[], config: ApiConfig): Cart => ({
  _id: parseInt(apiCart.id, 10),
  lineItems: filterIncludedLineItems(included).map(e => deserializeLineItem(e, config)),
  token: apiCart.attributes.token
});

export const serializeCouponCode = ({ couponCode }: CouponCode): CouponCodeAttr => ({
  coupon_code: couponCode
});
