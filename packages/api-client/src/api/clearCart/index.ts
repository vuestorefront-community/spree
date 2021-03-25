import { ApiContext } from '../../types';

export default async function clearCart({ client, config }: ApiContext) {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.emptyCart({ bearerToken });

  if (result.isSuccess()) {
    return true;
  } else {
    throw result.fail();
  }
}
