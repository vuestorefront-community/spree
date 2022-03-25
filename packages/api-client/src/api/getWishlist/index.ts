import { ApiContext, Wishlist } from '../../types';
import { wishlistFeatureState, emptyWishlist } from '../common/wishlist';
import getWishlistV1 from './V1';
import getWishlistV2 from './V2';

export default async function getWishlist({ client, config }: ApiContext): Promise<Wishlist> {
  switch (config.spreeFeatures.wishlist) {
    case wishlistFeatureState.legacy:
      return await getWishlistV1({ client, config });
    case wishlistFeatureState.enabled:
      return await getWishlistV2({ client, config });
    case wishlistFeatureState.disabled:
    default:
      return { ...emptyWishlist, isDisabled: true };
  }
}
