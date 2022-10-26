import { ApiContext, ClearCartParams } from '../../types';

export default async function clearCart({ client, config }: ApiContext, { token }: ClearCartParams): Promise<void> {
  const currency = await config.internationalization.getCurrency();
  const result = await client.cart.emptyCart({ order_token: token, currency });

  if (result.isFail()) {
    throw result.fail();
  }
}
