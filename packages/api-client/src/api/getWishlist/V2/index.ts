import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import { ApiContext, Wishlist } from '../../../types';
import { deserializeWishlist } from '../../serializers/wishlist';
import { emptyWishlist, wishedProductDocumentTypeV2, wishedProductsRelationshipNameV2 } from '../../common/wishlist';

const getWishlistInclude = 'wished_items,wished_items.variant,wished_items.variant.images,wished_items.variant.product';

export default async function getWishlistV2({ client, config }: ApiContext): Promise<Wishlist> {
  const { bearer_token } = await getCurrentBearerToken({ client, config });
  if (!bearer_token) emptyWishlist;

  const response = await client.wishlists.default({
    bearer_token,
    include: getWishlistInclude
  });

  if (response.isSuccess()) {
    const { data, included } = response.success();
    return deserializeWishlist(data, included, config, wishedProductDocumentTypeV2, wishedProductsRelationshipNameV2);
  } else {
    throw response.fail();
  }
}
