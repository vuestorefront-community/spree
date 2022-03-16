import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { ApiContext, Wishlist } from '../../../types';
import { deserializeWishlist } from '../../serializers/wishlist';
import { emptyWishlist, wishedProductDocumentTypeV2, wishedProductsRelationshipNameV2 } from '../../common/wishlist';

const getWishlistInclude = 'wished_items,wished_items.variant,wished_items.variant.images,wished_items.variant.product';

export default async function getWishlistV2({ client, config }: ApiContext): Promise<Wishlist> {
  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/default?include=${getWishlistInclude}`);
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken) emptyWishlist;

  const result = await axios.get(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });

  const { data, included } = result.data;
  return deserializeWishlist(data, included, config, wishedProductDocumentTypeV2, wishedProductsRelationshipNameV2);
}
