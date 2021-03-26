import { ApiContext } from '../../types';

export default async function clearCart({ client, config }: ApiContext): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.emptyCart({ bearerToken });

  if (result.isFail()) {
    throw result.fail();
  }
}
