import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function getCurrentUser({ client, config }: ApiContext) {
  const bearerToken = await getCurrentBearerToken({ client, config });

  const response = await client.account.accountInfo({ bearerToken });
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw response.fail();
  }
}
