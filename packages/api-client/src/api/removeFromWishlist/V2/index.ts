import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { ApiContext, RemoveFromWishlistParams } from '../../../types';

export default async function removeFromWishlistV2({ client, config }: ApiContext, { wishlistToken, wishedProductId }: RemoveFromWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken || !wishedProductId) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}/remove_item/${wishedProductId}`);

  await axios.delete(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
