/* eslint-disable camelcase */
import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function savePaymentMethod({ client, config }: ApiContext, methodId: number, payload: any): Promise<void> {
  const token = await getCurrentCartToken(config);

  const result = await client.checkout.orderUpdate(token, {
    order: {
      payments_attributes: [
        {
          payment_method_id: methodId.toString()
        }
      ]
    },
    payment_source: {
      [methodId]: payload
    }
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
