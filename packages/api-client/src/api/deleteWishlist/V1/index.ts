import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { ApiContext, DeleteWishlistParams } from '../../../types';

export default async function deleteWishlistV1({ client, config }: ApiContext, { wishlistToken }: DeleteWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}`);

  await axios.delete(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
