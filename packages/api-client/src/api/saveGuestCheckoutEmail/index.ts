import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function saveGuestCheckoutEmail({ client, config }: ApiContext, email: string) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const result = await client.checkout.orderUpdate(token, {
      order: {
        email
      },
      currency
    });

    if (result.isFail()) {
      throw result.fail();
    }
    return result.success().data;
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
