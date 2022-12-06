import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { RequiredAccountToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

export default async function updateUser({ client, config }: ApiContext, { email, firstName, lastName }): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  const updateData = {
    user: {
      email,
      first_name: firstName,
      last_name: lastName
    }
  };
  const result = await client.account.update({ ...token, ...updateData });
  if (result.isFail()) {
    throw result.fail();
  }
}
