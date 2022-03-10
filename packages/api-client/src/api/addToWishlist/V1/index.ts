import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { AddToWishlistParams, ApiContext } from '../../../types';
import { serializeWishedProduct } from '../../serializers/wishlist';

export default async function addToWishlistV1({ client, config }: ApiContext, { wishlistToken, product }: AddToWishlistParams): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken || !wishlistToken) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}/wished_products`);
  await axios.post(url, {
    wished_product: serializeWishedProduct(product)
  },
  {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
