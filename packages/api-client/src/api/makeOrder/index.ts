import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function makeOrder({ client, config }: ApiContext) {
  try {
    const token = await getCurrentCartToken(config);
    await client.checkout.complete(token);
    await config.auth.removeCartToken();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
