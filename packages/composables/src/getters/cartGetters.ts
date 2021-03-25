import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@upsidelab/vue-storefront-spree-api/src/types';

export const getCartItems = (cart: Cart): LineItem[] => {
  return cart.lineItems;
};

//   {
//     _id: 1,
//     _description: 'Some description',
//     _categoriesRef: [
//       '1',
//       '2'
//     ],
//     name: 'Black jacket',
//     sku: 'black-jacket',
//     images: [
//       'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
//     ],
//     price: {
//       original: 12.34,
//       current: 10.00
//     },
//     qty: 1
//   }
// ];

export const getCartItemName = (lineItem: LineItem): string => lineItem.name;

export const getCartItemImage = (lineItem: LineItem): string => lineItem.images.length > 0 ? lineItem.images[0] : 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

export const getCartItemPrice = (lineItem: LineItem): AgnosticPrice => {
  return {
    regular: lineItem.price.original || 12,
    special: lineItem.price.current || 10
  };
};

export const getCartItemQty = (lineItem: LineItem): number => lineItem.qty;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (lineItem: LineItem, filterByAttributeName?: Array<string>) => ({ color: 'red' });

export const getCartItemSku = (lineItem: LineItem): string => lineItem.sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: 10,
    subtotal: 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => cart.lineItems.length;

export const getFormattedPrice = (price: number) => String(price);

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
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
