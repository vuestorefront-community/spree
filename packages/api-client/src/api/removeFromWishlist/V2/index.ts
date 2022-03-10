import { ApiContext, RemoveFromWishlistParams } from '../../../types';

export default async function removeFromWishlistV2({ client, config }: ApiContext, { wishlistToken, wishedProductId }: RemoveFromWishlistParams): Promise<void> {}