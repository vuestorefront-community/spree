import axios from 'axios';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { ApiContext, Wishlist, ProductVariant } from '../../types';
import { serializeWishedProduct } from '../serializers/wishlist';

export default async function addToWishlist({ client, config }: ApiContext, currentWishlist: Wishlist, product: ProductVariant): Promise<void> {
  if (!currentWishlist?.token) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${currentWishlist.token}/wished_products`);
  const bearerToken = await getCurrentBearerToken({ client, config });

  if (!bearerToken) return;

  await axios.post(url, {
    wished_product: serializeWishedProduct(product)
  },
  {
    headers: getAuthorizationHeaders({ bearerToken })
  });
}
