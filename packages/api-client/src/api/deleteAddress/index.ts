import { RequiredAccountToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function deleteAddress({ client, config }: ApiContext, addressId: string): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  await client.account.removeAddress({ id: addressId, ...token });
}
