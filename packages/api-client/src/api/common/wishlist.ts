import { Wishlist } from '../../types';

export const wishlistFeatureState = Object.freeze({
  enabled: 'enabled',
  legacy: 'legacy',
  disabled: 'disabled'
});

export const getWishlistInclude =
  'wished_products,wished_products.variant,wished_products.variant.images,wished_products.variant.product';

export const emptyWishlist: Wishlist = {
  token: undefined,
  wishedProducts: []
};
