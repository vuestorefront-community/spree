import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import { ApiContext, RemoveFromWishlistParams } from '../../../types';

export default async function removeFromWishlistV2({ client, config }: ApiContext, { wishlistToken, wishedProductId }: RemoveFromWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken || !wishedProductId) return;

  const response = await client.wishlists.removeWishedItem({
    bearer_token: bearerToken,
    wishlist_token: wishlistToken,
    id: wishedProductId
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
