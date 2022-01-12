import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function makeOrder({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    await client.checkout.complete(token);
    await config.auth.removeCartToken();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
