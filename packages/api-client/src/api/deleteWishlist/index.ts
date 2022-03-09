import axios from 'axios';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { ApiContext } from '../../types';

export default async function deleteWishlist({ client, config }: ApiContext, wishlistToken: string): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}`);

  await axios.delete(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
