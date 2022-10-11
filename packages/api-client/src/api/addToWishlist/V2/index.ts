import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import { AddToWishlistParams, ApiContext } from '../../../types';

export default async function addToWishlistV2({ client, config }: ApiContext, { wishlistToken, product }: AddToWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const response = await client.wishlists.addWishedItem({
    bearer_token: bearerToken,
    wishlist_token: wishlistToken,
    variant_id: String(product._variantId),
    quantity: 1
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
