import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { AddToWishlistParams, ApiContext } from '../../../types';

export default async function addToWishlistV2({ client, config }: ApiContext, { wishlistToken, product }: AddToWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}/add_item`);
  await axios.post(url, {
    variant_id: product._variantId,
    quantity: 1
  },
  {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
