import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function updateUser({ client, config }: ApiContext, { email, firstName, lastName }): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const updateData = {
    user: {
      email,
      first_name: firstName,
      last_name: lastName
    }
  };
  const result = await client.account.update({ bearerToken }, updateData);
  if (result.isFail()) {
    throw result.fail();
  }
}
