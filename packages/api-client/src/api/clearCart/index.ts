import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function clearCart({ client, config }: ApiContext): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.emptyCart(token);

  if (result.isFail()) {
    throw result.fail();
  }
}
