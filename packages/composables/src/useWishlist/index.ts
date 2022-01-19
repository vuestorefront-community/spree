/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { Wishlist, WishlistProduct, ProductVariant } from '../types';

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct | ProductVariant, ProductVariant> = {
  load: async (context: Context) => {
    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  addItem: async (context: Context, { currentWishlist, product }) => {
    await context.$spree.api.addToWishlist(currentWishlist, product);

    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product }) => {
    const wishedProduct = product.wishedProductId
      ? product
      : currentWishlist.wishedProducts.find(e => e.variantId === product._variantId);

    await context.$spree.api.removeFromWishlist(currentWishlist, wishedProduct.wishedProductId);

    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return {};
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.wishedProducts.some(e => e.variantId === product._variantId);
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct | ProductVariant, ProductVariant>(params);
