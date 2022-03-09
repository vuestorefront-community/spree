/* eslint-disable camelcase */
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function savePaymentMethod({ client, config }: ApiContext, methodId: number, payload: any): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const currency = await config.internationalization.getCurrency();

  const result = await client.checkout.orderUpdate(token, {
    order: {
      payments_attributes: [
        {
          payment_method_id: methodId.toString()
        }
      ]
    },
    currency,
    payment_source: {
      [methodId]: payload
    }
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
