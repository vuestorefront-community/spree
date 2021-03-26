import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function clearCart({ client, config }: ApiContext): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const result = await client.cart.emptyCart({ bearerToken });

  if (result.isFail()) {
    throw result.fail();
  }
}
