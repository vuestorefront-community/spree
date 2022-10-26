import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { AddToWishlistParams, ApiContext } from '../../../types';
import { RequiredAccountToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { serializeWishedProduct } from '../../serializers/wishlist';

export default async function addToWishlistV1({ client, config }: ApiContext, { wishlistToken, product }: AddToWishlistParams): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  if (!token.bearer_token || !wishlistToken) return;

  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/${wishlistToken}/wished_products`);
  await axios.post(url, {
    wished_product: serializeWishedProduct(product)
  },
  {
    headers: getAuthorizationHeaders({ ...token })
  });
}
