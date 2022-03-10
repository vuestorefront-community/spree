import { AddToWishlistParams, ApiContext } from '../../types';
import { wishlistFeatureState } from '../common/wishlist';
import addToWishlistV1 from './V1';
import addToWishlistV2 from './V2';

export default async function addToWishlist({ client, config }: ApiContext, params: AddToWishlistParams): Promise<void> {
  switch (config.spreeFeatures.wishlist) {
    case wishlistFeatureState.legacy:
      await addToWishlistV1({ client, config }, params);
      break;
    case wishlistFeatureState.enabled:
      await addToWishlistV2({ client, config }, params);
      break;
    case wishlistFeatureState.disabled:
    default:
      break;
  }
}
