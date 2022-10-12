import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { ApiContext, DeleteWishlistParams } from '../../types';

export default async function deleteWishlist({ client, config }: ApiContext, { wishlistToken }: DeleteWishlistParams): Promise<void> {
  const { bearer_token } = await getCurrentBearerToken({ client, config });
  if (!bearer_token || !wishlistToken) return;

  const response = await client.wishlists.remove({
    bearer_token,
    wishlist_token: wishlistToken
  });

  if (response.isFail()) {
    throw response.fail();
  }
}
