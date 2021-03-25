import { ApiContext } from '../../types';

export default async function logIn({ client, config }: ApiContext, params) {
  const { username, password } = params;

  const response = await client.authentication.getToken({ username, password });

  if (response.isSuccess()) {
    const bearerToken = response.success().access_token;
    await config.auth.changeToken(bearerToken);
  } else {
    throw response.fail();
  }
}
