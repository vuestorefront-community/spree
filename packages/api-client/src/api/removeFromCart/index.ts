import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId }): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const response = await client.cart.removeItem({ bearerToken }, lineItemId);

  if (response.isFail()) {
    throw response.fail();
  }
}
