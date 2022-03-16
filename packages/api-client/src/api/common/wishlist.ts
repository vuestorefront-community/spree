import { Wishlist } from '../../types';

export const wishlistFeatureState = Object.freeze({
  enabled: 'enabled',
  legacy: 'legacy',
  disabled: 'disabled'
});

export const wishedProductDocumentTypeV1 = 'wished_product';
export const wishedProductDocumentTypeV2 = 'wished_item';

export const wishedProductsRelationshipNameV1 = 'wished_products';
export const wishedProductsRelationshipNameV2 = 'wished_items';

export const emptyWishlist: Wishlist = {
  token: undefined,
  wishedProducts: []
};
