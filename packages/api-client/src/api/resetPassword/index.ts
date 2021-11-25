import { ApiContext, ResetPasswordParams } from '../..';

export default async function resetPassword(
  { client }: ApiContext,
  { token, password, passwordConfirmation }: ResetPasswordParams
): Promise<void> {
  const result = await client.account.resetPassword(token, {
    user: {
      password,
      password_confirmation: passwordConfirmation
    }
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
