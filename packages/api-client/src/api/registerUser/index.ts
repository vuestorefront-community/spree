import { ApiContext } from '../../types';

export default async function registerUser({ client }: ApiContext, { email, password }) {
  const userData = {
    email,
    password,
    passwordConfirmation: password
  };

  await client.account.create({
    user: userData
  });
}
