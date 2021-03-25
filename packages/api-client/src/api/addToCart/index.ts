/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function addToCart({ client, config }: ApiContext, params): Promise<void> {
  const bearerToken = await config.auth.getToken();

  const result = await client.cart.addItem({ bearerToken }, {
    variant_id: params.variantId,
    quantity: params.quantity
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
