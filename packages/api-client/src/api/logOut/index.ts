import { ApiContext } from '../../types';

export default async function logOut({ config }: ApiContext): Promise<void> {
  await config.auth.removeOAuthToken();
}
