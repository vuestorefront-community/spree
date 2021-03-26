/* eslint-disable camelcase */

import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function updateItemQuantity({ client, config }: ApiContext, { lineItemId, quantity }): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const response = await client.cart.setQuantity(token, { line_item_id: lineItemId, quantity });

  if (response.isFail()) {
    throw response.fail();
  }
}
