import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { ApiContext, DeleteWishlistParams } from '../../types';

export default async function deleteWishlist({ client, config }: ApiContext, { wishlistToken }: DeleteWishlistParams): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  if (!token.bearer_token || !wishlistToken) return;

  const response = await client.wishlists.remove({
    ...token,
    wishlist_token: wishlistToken
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
