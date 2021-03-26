import { SpreeError } from '@spree/storefront-api-v2-sdk/types/errors';
import { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query';
import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext, Cart } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCart } from '../serializers/cart';

const cartParams: IQuery = { include: 'line_items' };

async function createCart({ client, config }: ApiContext, token: IToken): Promise<Cart> {
  const createCartResult = await client.cart.create(token, cartParams);

  if (createCartResult.isSuccess()) {
    const payload = createCartResult.success();
    const cart = deserializeCart(payload.data, payload.included);

    const isGuestUser = !token.bearerToken;
    if (isGuestUser) {
      const newCartToken = payload.data.attributes.token;
      await config.auth.changeCartToken(newCartToken);
    }

    return cart;
  } else {
    throw createCartResult.fail();
  }
}

export default async function getCart({ client, config }: ApiContext): Promise<Cart> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.show(token, cartParams);

  if (result.isSuccess()) {
    const payload = result.success();
    const cart = deserializeCart(payload.data, payload.included);

    return cart;
  } else {
    const error = result.fail() as SpreeError;
    const serverResponse = error.serverResponse;

    if (serverResponse && serverResponse.status === 404) {
      createCart({ client, config }, token);
    } else {
      throw result.fail();
    }
  }
}
