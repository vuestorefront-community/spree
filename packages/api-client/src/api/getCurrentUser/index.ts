import { ApiContext } from '../../types';

export default async function getCurrentUser({ client, config }: ApiContext) {
  const bearerToken = await config.auth.getToken();

  const response = await client.account.accountInfo({ bearerToken });
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw response.fail();
  }
}
