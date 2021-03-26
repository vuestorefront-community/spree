import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function isGuest({ client, config }: ApiContext): Promise<boolean> {
  if (await getCurrentBearerToken({ client, config })) {
    return false;
  }

  return true;
}
