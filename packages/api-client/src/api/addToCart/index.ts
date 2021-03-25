/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function addToCart({ client, config }: ApiContext, params) {
  const bearerToken = await config.auth.getToken();

  const result = await client.cart.addItem({ bearerToken }, {
    variant_id: params.variantId,
    quantity: params.quantity
  });

  if (result.isSuccess()) {
    return true;
  } else {
    throw result.fail();
  }
}
