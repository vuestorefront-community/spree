/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId }) {
  const bearerToken = await config.auth.getToken();
  const response = await client.cart.removeItem({ bearerToken }, lineItemId);
  if (response.isSuccess()) {
    return true;
  } else {
    throw response.fail();
  }
}
