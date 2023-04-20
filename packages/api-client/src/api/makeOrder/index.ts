import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';
import type { RequiredAnyToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function makeOrder({ client, config }: ApiContext): Promise<void> {
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
