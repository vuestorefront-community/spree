import { ApiContext } from '../../types';

export default async function registerUser({ client }: ApiContext, { email, password, firstName, lastName }): Promise<void> {
  const userData = {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    passwordConfirmation: password
  };

  const result = await client.account.create({ user: userData });

  if (result.isFail()) {
    throw result.fail();
  }
}
