import axios from 'axios';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { ApiContext, ProductVariant } from '../../types';
import { serializeWishedProduct } from '../serializers/wishlist';

export default async function addToWishlist({ client, config }: ApiContext, wishlistToken: string, product: ProductVariant): Promise<void> {
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
