import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { Wishlist, WishlistProduct } from '../types';

export const getWishlistItems = (wishlist: Wishlist): WishlistProduct[] => wishlist?.wishedProducts || [];

export const getWishlistItemName = (product: WishlistProduct): string => product?.name;

export const getWishlistItemImage = (product: WishlistProduct): string => product?.image;

export const getWishlistItemPrice = (product: WishlistProduct): AgnosticPrice => {
  return {
    regular: product?.price,
    special: undefined
  };
};

export const getWishlistItemQty = (): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: WishlistProduct, filterByAttributeName?: string[]) => ({ });

export const getWishlistItemSku = (product: WishlistProduct): string => product?.sku;

export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  const total = wishlist?.wishedProducts.reduce((prev, curr) => prev += Number(curr.price), 0);

  return {
    total,
    subtotal: total
  };
};

export const getWishlistShippingPrice = (): number => undefined;

export const getWishlistTotalItems = (wishlist: Wishlist): number => wishlist?.wishedProducts.length;

export const getFormattedPrice = (price: number): string => String(price);

export const isWishlistDisabled = (wishlist: Wishlist): boolean => wishlist?.isDisabled;

const wishlistGetters: WishlistGetters<Wishlist, WishlistProduct> = {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice,
  isWishlistDisabled
};

export default wishlistGetters;
