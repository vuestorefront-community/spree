import { ApiContext } from '../../types';

export default async function isGuest({ config }: ApiContext): Promise<boolean> {
  if (await config.auth.getToken()) {
    return false;
  }

  return true;
}
