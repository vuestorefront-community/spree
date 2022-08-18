/* eslint-disable camelcase */
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function addPaymentMethod({ client, config }: ApiContext, methodId: number): Promise<void> {
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
    currency
  });

  if (result.isFail()) {
    throw result.fail();
  }
}