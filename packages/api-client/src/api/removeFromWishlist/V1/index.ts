import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { ApiContext, RemoveFromWishlistParams } from '../../../types';

export default async function removeFromWishlistV1({ client, config }: ApiContext, { wishlistToken, wishedProductId }: RemoveFromWishlistParams): Promise<void> {
  const { bearer_token } = await getCurrentBearerToken({ client, config });
  if (!bearer_token || !wishlistToken || !wishedProductId) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}/wished_products/${wishedProductId}`);

  await axios.delete(url, {
    headers: getAuthorizationHeaders({ bearer_token })
  });
}
