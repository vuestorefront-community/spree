import axios from 'axios';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { ApiContext, Wishlist } from '../../types';

export default async function removeFromWishlist({ client, config }: ApiContext, currentWishlist: Wishlist, wishedProductId: string): Promise<void> {
  if (!currentWishlist?.token) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${currentWishlist.token}/wished_products/${wishedProductId}`);
  const bearerToken = await getCurrentBearerToken({ client, config });

  if (!bearerToken) return;

  await axios.delete(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
