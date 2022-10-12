import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeUser } from '../serializers/user';

export default async function getCurrentUser({ client, config }: ApiContext) {
  const { bearer_token } = await getCurrentBearerToken({ client, config });

  const response = await client.account.accountInfo({ bearerToken: bearer_token });
  if (response.isSuccess()) {
    return deserializeUser(response.success().data);
  } else {
    throw response.fail();
  }
}
