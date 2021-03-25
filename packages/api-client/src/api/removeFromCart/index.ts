import { ApiContext } from '../../types';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId }): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const response = await client.cart.removeItem({ bearerToken }, lineItemId);

  if (response.isFail()) {
    throw response.fail();
  }
}
