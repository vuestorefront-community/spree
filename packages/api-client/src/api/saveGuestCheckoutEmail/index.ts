import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function saveGuestCheckoutEmail({ client, config }: ApiContext, email: string) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const result = await client.checkout.orderUpdate(token, {
      order: {
        email
      }
    });

    if (result.isFail()) {
      throw result.fail();
    }
    return result.success().data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
