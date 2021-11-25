import { ApiContext } from '../../types';

export default async function forgotPassword({ client }: ApiContext, email: string): Promise<void> {
  const result = await client.account.forgotPassword({
    user: {
      email
    }
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
