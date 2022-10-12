import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';
import { RequiredAnyToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function makeOrder({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config }) as RequiredAnyToken;
    const currency = await config.internationalization.getCurrency();

    await client.checkout.complete({ ...token, currency });
    await config.auth.removeCartToken();
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
