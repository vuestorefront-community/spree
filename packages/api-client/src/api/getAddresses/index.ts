import { Address, ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeAddress } from '../serializers/address';

export default async function getAddresses({ client, config }: ApiContext): Promise<Address[]> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const result = await client.account.addressesList({ bearerToken });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(deserializeAddress);

    return addresses;
  } else {
    throw result.fail();
  }
}
