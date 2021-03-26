/* eslint-disable camelcase */

import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function addToCart({ client, config }: ApiContext, params): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });

  const result = await client.cart.addItem({ bearerToken }, {
    variant_id: params.variantId,
    quantity: params.quantity
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
