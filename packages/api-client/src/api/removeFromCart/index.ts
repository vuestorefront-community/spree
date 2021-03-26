import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId }): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const response = await client.cart.removeItem(token, lineItemId);

  if (response.isFail()) {
    throw response.fail();
  }
}
