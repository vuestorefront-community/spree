import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { ApiContext, DeleteWishlistParams } from '../../types';

export default async function deleteWishlist({ client, config }: ApiContext, { wishlistToken }: DeleteWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const response = await client.wishlists.remove({
    bearer_token: bearerToken,
    wishlist_token: wishlistToken
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
