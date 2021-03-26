import { ApiContext } from '../../types';

export default async function logIn({ client, config }: ApiContext, params) {
  const { username, password } = params;

  const response = await client.authentication.getToken({ username, password });

  if (response.isSuccess()) {
    const token = response.success();
    await config.auth.changeToken(token);
  } else {
    throw response.fail();
  }
}
