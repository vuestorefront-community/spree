import { SpreeError } from '@spree/storefront-api-v2-sdk/types/errors';
import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext, Cart } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCart } from '../serializers/cart';
import { cartParams } from '../common/cart';
import { Logger } from '@vue-storefront/core';

async function createCart({ client, config }: ApiContext, token: IToken): Promise<Cart> {
  const currency = await config.internationalization.getCurrency();
  const createCartResult = await client.cart.create(token, { ...cartParams, currency });

  if (createCartResult.isSuccess()) {
    const payload = createCartResult.success();
    const cart = deserializeCart(payload.data, payload.included, config);

    const isGuestUser = !(token?.bearerToken);
    if (isGuestUser) {
      const newCartToken = payload.data.attributes.token;
      await config.auth.changeCartToken(newCartToken);
    }

    return cart;
  } else {
    throw createCartResult.fail();
  }
}

export default async function getOrCreateCart({ client, config }: ApiContext): Promise<Cart> {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const result = await client.cart.show(token, { ...cartParams, currency });

    if (result.isSuccess()) {
      const payload = result.success();
      const cart = deserializeCart(payload.data, payload.included, config);
      return cart;
    } else {
      const error = result.fail() as SpreeError;
      const serverResponse = error.serverResponse;

      if (serverResponse && serverResponse.status === 404) {
        return await createCart({ client, config }, token);
      } else {
        throw result.fail();
      }
    }
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
