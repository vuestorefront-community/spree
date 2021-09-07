import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function saveGuestCheckoutEmail({ client, config }: ApiContext, email: string) {
  try {
    const token = await getCurrentCartToken(config);
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
