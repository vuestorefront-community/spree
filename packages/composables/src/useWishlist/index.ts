/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { Wishlist, WishlistProduct, ProductVariant } from '../types';

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, ProductVariant> = {
  load: async (context: Context) => {
    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: addToWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: removeFromWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, { currentWishlist }) => {
    console.log('Mocked: isInWishlist');
    return false;
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, ProductVariant>(params);
