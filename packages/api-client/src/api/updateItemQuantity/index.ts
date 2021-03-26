/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function updateItemQuantity({ client, config }: ApiContext, { lineItemId, quantity }): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const response = await client.cart.setQuantity({ bearerToken }, { line_item_id: lineItemId, quantity });

  if (response.isFail()) {
    throw response.fail();
  }
}
