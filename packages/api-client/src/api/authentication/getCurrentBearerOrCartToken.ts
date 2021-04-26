import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext } from '../../types';
import getCurrentBearerToken from './getCurrentBearerToken';

export default async function getCurrentBearerOrCartToken({ client, config }: ApiContext): Promise<IToken> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (bearerToken) {
    return { bearerToken };
  }

  const cartToken = await config.auth.getCartToken();
  if (cartToken) {
    return { orderToken: cartToken };
  }

  const createCartResult = await client.cart.create();
  if (createCartResult.isSuccess()) {
    const newCartToken = createCartResult.success().data.attributes.token;
    await config.auth.changeCartToken(newCartToken);
    return { orderToken: newCartToken };
  }

  return {};
}
