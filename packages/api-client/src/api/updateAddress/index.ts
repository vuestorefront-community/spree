import { Address, ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { serializeAddress } from '../serializers/address';

export default async function updateAddress({ client, config }: ApiContext, params: Address) {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const serializedAddress = serializeAddress(params);
  const result = await client.account.updateAddress({ bearerToken }, params._id, { address: serializedAddress });

  if (result.isSuccess()) {
    const data = result.success().data;
    return data;
  } else {
    throw result.fail();
  }
}
