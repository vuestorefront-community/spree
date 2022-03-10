import { ApiContext, Wishlist } from '../../../types';
import { emptyWishlist } from '../../common/wishlist';

export default async function getWishlistV2({ client, config }: ApiContext): Promise<Wishlist> {
  return emptyWishlist;
}
