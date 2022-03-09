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
    const wishlistToken = currentWishlist?.token;
    await context.$spree.api.addToWishlist({ wishlistToken, product });

    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product }) => {
    // product param is either ProductVariant (which doesn't have wishedProductId property) or WishlistProduct
    // (depends on where this method is called)
    const wishedProduct: WishlistProduct = product.wishedProductId
      ? product
      : currentWishlist.wishedProducts.find(e => e.variantId === product._variantId);
    const wishlistToken = currentWishlist?.token;

    await context.$spree.api.removeFromWishlist({
      wishlistToken,
      wishedProductId: wishedProduct?.wishedProductId
    });

    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  clear: async (context: Context, { currentWishlist }) => {
    await context.$spree.api.deleteWishlist({ wishlistToken: currentWishlist.token });
    const wishlist = await context.$spree.api.getWishlist();
    return wishlist;
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.wishedProducts.some(e => e.variantId === product._variantId);
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct | ProductVariant, ProductVariant>(params);
