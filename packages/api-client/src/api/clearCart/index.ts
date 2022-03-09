import { ApiContext, ClearCartParams } from '../../types';

export default async function clearCart({ client, config }: ApiContext, { token }: ClearCartParams): Promise<void> {
  const currency = await config.internationalization.getCurrency();
  const result = await client.cart.emptyCart({ orderToken: token }, { currency });

  if (result.isFail()) {
    throw result.fail();
  }
}
