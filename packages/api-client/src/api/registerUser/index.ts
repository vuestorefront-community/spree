import { ApiContext } from '../../types';

export default async function registerUser({ client }: ApiContext, { email, password }): Promise<void> {
  const userData = {
    email,
    password,
    passwordConfirmation: password
  };

  const result = await client.account.create({ user: userData });

  if (result.isFail()) {
    throw result.fail();
  }
}
