import { ApiContext, ResetPasswordParams } from '../../types';

export default async function resetPassword({ client }: ApiContext, { token, password }: ResetPasswordParams): Promise<void> {
  const result = await client.account.resetPassword({
    reset_password_token: token,
    user: {
      password,
      password_confirmation: password
    }
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
