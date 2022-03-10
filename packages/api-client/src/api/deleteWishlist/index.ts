import { ApiContext, DeleteWishlistParams } from '../../types';
import { wishlistFeatureState } from '../common/wishlist';
import deleteWishlistV1 from './V1';
import deleteWishlistV2 from './V2';

export default async function deleteWishlist({ client, config }: ApiContext, params: DeleteWishlistParams): Promise<void> {
  switch (config.spreeFeatures.wishlist) {
    case wishlistFeatureState.legacy:
      await deleteWishlistV1({ client, config }, params);
      break;
    case wishlistFeatureState.enabled:
      await deleteWishlistV2({ client, config }, params);
      break;
    case wishlistFeatureState.disabled:
    default:
      break;
  }
}
