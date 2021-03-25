/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function updateItemQuantity({ client, config }: ApiContext, { lineItemId, quantity }) {
  const bearerToken = await config.auth.getToken();
  const response = await client.cart.setQuantity({ bearerToken }, { line_item_id: lineItemId, quantity });

  if (response.isSuccess()) {
    return true;
  } else {
    throw response.fail();
  }
}
