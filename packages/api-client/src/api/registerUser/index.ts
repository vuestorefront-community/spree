import { ApiContext } from '../../types';

export default async function registerUser({ client, config }: ApiContext, { email, password }): Promise<void> {
  const userData = {
    email,
    password,
    passwordConfirmation: password
  };

  const result = await client.account.create({ user: userData });

  if (result.isFail()) {
    throw result.fail();
  }

  const tokenResponse = await client.authentication.getToken({ username: email, password });

  if (tokenResponse.isSuccess()) {
    const token = tokenResponse.success();
    await config.auth.changeOAuthToken(token);
  } else {
    throw tokenResponse.fail();
  }
}
