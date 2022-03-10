import { ApiContext, RemoveFromWishlistParams } from '../../types';
import { wishlistFeatureState } from '../common/wishlist';
import removeFromWishlistV1 from './V1';
import removeFromWishlistV2 from './V2';

export default async function removeFromWishlist({ client, config }: ApiContext, params: RemoveFromWishlistParams): Promise<void> {
  switch (config.spreeFeatures.wishlist) {
    case wishlistFeatureState.legacy:
      await removeFromWishlistV1({ client, config }, params);
      break;
    case wishlistFeatureState.enabled:
      await removeFromWishlistV2({ client, config }, params);
      break;
    case wishlistFeatureState.disabled:
    default:
      break;
  }
}
