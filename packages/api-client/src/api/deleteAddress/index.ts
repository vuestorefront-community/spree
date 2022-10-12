import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function deleteAddress({ client, config }: ApiContext, addressId: string): Promise<void> {
  const { bearer_token } = await getCurrentBearerToken({ client, config });
  await client.account.removeAddress({ bearerToken: bearer_token }, addressId);
}
