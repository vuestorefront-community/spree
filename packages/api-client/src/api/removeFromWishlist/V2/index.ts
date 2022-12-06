import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import { ApiContext, RemoveFromWishlistParams } from '../../../types';

export default async function removeFromWishlistV2({ client, config }: ApiContext, { wishlistToken, wishedProductId }: RemoveFromWishlistParams): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  if (!token.bearer_token || !wishlistToken || !wishedProductId) return;

  const response = await client.wishlists.removeWishedItem({
    ...token,
    wishlist_token: wishlistToken,
    id: wishedProductId
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
