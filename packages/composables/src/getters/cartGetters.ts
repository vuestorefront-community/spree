import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/spree-api/src/types';

export const getCartItems = (cart: Cart): LineItem[] => cart?.lineItems || [];

export const getCartItemName = (lineItem: LineItem): string => lineItem.name;

export const getCartItemImage = (lineItem: LineItem): string => lineItem.image;

export const getCartItemPrice = (lineItem: LineItem): AgnosticPrice => {
  return {
    regular: lineItem.price.current,
    special: undefined
  };
};

export const getCartItemTotalPrice = (lineItem: LineItem): string => lineItem?.displayTotal || '';

export const getCartItemQty = (lineItem: LineItem): number => lineItem.qty;

export const getCartItemAttributes = (lineItem: LineItem, filters?: Array<string>) => {
  const { options } = lineItem;
  return filters.length > 0
    ? filters.reduce((filteredOptions, filter) => ({ ...filteredOptions, [filter]: options[filter] }), {})
    : options;
};

export const getCartItemSku = (lineItem: LineItem): string => lineItem.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: cart?.totalAmount || 0,
    subtotal: cart?.itemTotalAmount || 0,
    special: cart?.itemTotalAmount || 0
  };
};

export const getCartShippingPrice = (cart: Cart): number => cart.shipTotalAmount;

export const getCartTotalItems = (cart: Cart): number => cart?.itemCount || 0;

export const getFormattedPrice = (price: number): string => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemTotalPrice: getCartItemTotalPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
