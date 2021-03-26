import { Address, ApiContext } from '../../types';
import { serializeAddress } from '../serializers/address';

export default async function addAddress({ client, config }: ApiContext, params: Address): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const serializedAddress = serializeAddress(params);
  const result = await client.account.createAddress({ bearerToken }, { address: serializedAddress });

  if (result.isFail()) {
    throw result.fail();
  }
}
