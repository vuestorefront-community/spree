/* eslint-disable camelcase */

import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function addToCart({ client, config }: ApiContext, params): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });

  const result = await client.cart.addItem(token, {
    variant_id: params.variantId,
    quantity: params.quantity
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
