import { ApiContext } from '../../types';

export default async function clearCart({ client }: ApiContext, { token }): Promise<void> {
  const result = await client.cart.emptyCart({ orderToken: token });

  if (result.isFail()) {
    throw result.fail();
  }
}
