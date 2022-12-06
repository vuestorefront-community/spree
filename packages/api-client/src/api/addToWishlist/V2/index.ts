import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import { AddToWishlistParams, ApiContext } from '../../../types';

export default async function addToWishlistV2({ client, config }: ApiContext, { wishlistToken, product }: AddToWishlistParams): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  if (!token.bearer_token || !wishlistToken) return;

  const response = await client.wishlists.addWishedItem({
    ...token,
    wishlist_token: wishlistToken,
    variant_id: String(product._variantId),
    quantity: 1
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
